import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { promisify } from 'util';
import fs from 'fs';
import { IntroVideoOptions, OverlayOptions, ConcatenateOptions } from './types';

const exists = promisify(fs.exists);

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

export function generateIntroVideo(options: IntroVideoOptions): Promise<void> {
  const { introFramePath, outputPath, durationSeconds, width, height } =
    options;

  return new Promise((resolve, reject) => {
    console.log(
      `[Video Processing] Creating ${durationSeconds}s intro video from frame...`,
    );

    ffmpeg()
      .input(introFramePath)
      .inputOptions(['-loop 1', `-t ${durationSeconds}`])
      .videoCodec('libx264')
      .size(`${width}x${height}`)
      .outputOptions(['-pix_fmt yuv420p', '-preset fast', '-crf 23'])
      .on('start', (commandLine) => {
        console.log('[Video Processing] FFmpeg command:', commandLine);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(
            `[Video Processing] Intro generation progress: ${Math.round(
              progress.percent,
            )}%`,
          );
        }
      })
      .on('end', () => {
        console.log('[Video Processing] Intro video created successfully');
        resolve();
      })
      .on('error', (err) => {
        console.error(
          '[Video Processing] Error creating intro video:',
          err.message,
        );
        reject(err);
      })
      .save(outputPath);
  });
}

export function addLogoOverlay(options: OverlayOptions): Promise<void> {
  const { inputVideoPath, logoPath, outputPath, logoPosition, overlayText } =
    options;

  return new Promise((resolve, reject) => {
    console.log('[Video Processing] Adding logo overlay and text...');

    const boxX = logoPosition.x;
    const boxY = logoPosition.y;
    const boxWidth = 200;
    const boxHeight = 70;
    const logoX = boxX + 10;
    const logoY = boxY + 5;
    const textX = boxX + 80;
    const textY = boxY + 35;

    ffmpeg()
      .input(inputVideoPath)
      .input(logoPath)
      .complexFilter([
        `[0:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1,fps=30,format=yuv420p[normalized]`,
        `[1:v]scale=-1:60[logo]`,
        `[normalized]drawbox=x=${boxX}:y=${boxY}:w=${boxWidth}:h=${boxHeight}:color=white@1:t=fill[bg]`,
        `[bg]drawbox=x=${boxX}:y=${boxY}:w=${boxWidth}:h=${boxHeight}:color=purple@1:t=3[border]`,
        `[border][logo]overlay=${logoX}:${logoY}[withlogo]`,
        `[withlogo]drawtext=text='${overlayText}':fontsize=18:fontcolor=purple:x=${textX}:y=${textY}[final]`,
      ])
      .outputOptions(['-map [final]', '-map 0:a?'])
      .videoCodec('libx264')
      .outputOptions(['-preset fast', '-crf 23'])
      .on('start', (commandLine) => {
        console.log('[Video Processing] FFmpeg command:', commandLine);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(
            `[Video Processing] Overlay progress: ${Math.round(
              progress.percent,
            )}%`,
          );
        }
      })
      .on('end', () => {
        console.log('[Video Processing] Logo overlay added successfully');
        resolve();
      })
      .on('error', (err) => {
        console.error('[Video Processing] Error adding overlay:', err.message);
        reject(err);
      })
      .save(outputPath);
  });
}

export function concatenateVideos(options: ConcatenateOptions): Promise<void> {
  const { introPart, mainPart, outputPath } = options;

  return new Promise(async (resolve, reject) => {
    console.log('[Video Processing] Concatenating intro and main video...');

    const introExists = await exists(introPart);
    const mainExists = await exists(mainPart);

    if (!introExists) {
      reject(new Error(`Intro video not found: ${introPart}`));
      return;
    }
    if (!mainExists) {
      reject(new Error(`Main video not found: ${mainPart}`));
      return;
    }

    ffmpeg()
      .input(introPart)
      .input(mainPart)
      .complexFilter([
        '[0:v]scale=1920:1080,setsar=1,fps=30,format=yuv420p[v0]',
        '[1:v]scale=1920:1080,setsar=1,fps=30,format=yuv420p[v1]',
        '[v0][v1]concat=n=2:v=1:a=0[outv]',
      ])
      .outputOptions(['-map [outv]'])
      .videoCodec('libx264')
      .outputOptions(['-preset fast', '-crf 23'])
      .on('start', (commandLine) => {
        console.log('[Video Processing] FFmpeg command:', commandLine);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(
            `[Video Processing] Concatenation progress: ${Math.round(
              progress.percent,
            )}%`,
          );
        }
      })
      .on('end', () => {
        console.log('[Video Processing] Videos concatenated successfully');
        resolve();
      })
      .on('error', (err) => {
        console.error(
          '[Video Processing] Error concatenating videos:',
          err.message,
        );
        reject(err);
      })
      .save(outputPath);
  });
}

export async function waitForFile(
  filePath: string,
  timeoutMs = 5000,
): Promise<boolean> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    if (await exists(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 0) {
        return true;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return false;
}
