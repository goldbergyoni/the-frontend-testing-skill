import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { VideoProcessingOptions, VideoProcessingResult } from './types';
import {
  generateIntroVideo,
  addLogoOverlay,
  concatenateVideos,
  waitForFile,
} from './ffmpeg-helpers';
import {
  INTRO_FRAME_PATH,
  LOGO_PATH,
  DEFAULT_INTRO_DURATION_SECONDS,
  DEFAULT_LOGO_POSITION,
  DEFAULT_OVERLAY_TEXT,
  VIDEO_DIMENSIONS,
  PROCESSED_VIDEOS_DIR,
  TEMP_DIR,
} from './consts';

const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

export async function processTestVideo(
  options: VideoProcessingOptions,
): Promise<VideoProcessingResult> {
  const startTime = Date.now();
  console.log('\n========================================');
  console.log('[Video Processing] Starting video processing...');
  console.log(`[Video Processing] Input video: ${options.inputVideoPath}`);
  console.log(`[Video Processing] Test title: ${options.testTitle}`);
  console.log('========================================\n');

  try {
    await mkdir(PROCESSED_VIDEOS_DIR, { recursive: true });
    await mkdir(TEMP_DIR, { recursive: true });

    const introDuration =
      options.introDurationSeconds ?? DEFAULT_INTRO_DURATION_SECONDS;
    const logoPosition = options.logoPosition ?? DEFAULT_LOGO_POSITION;
    const overlayText = options.overlayText ?? DEFAULT_OVERLAY_TEXT;

    console.log(
      '[Video Processing] Waiting for input video file to be fully written...',
    );
    const fileReady = await waitForFile(options.inputVideoPath, 10000);
    if (!fileReady) {
      throw new Error('Input video file not ready or empty');
    }
    console.log('[Video Processing] Input video file is ready\n');

    const sanitizedTitle = sanitizeFilename(options.testTitle);
    const timestamp = Date.now();

    const introVideoPath = path.join(TEMP_DIR, `intro-${timestamp}.mp4`);
    const overlayVideoPath = path.join(TEMP_DIR, `overlay-${timestamp}.mp4`);
    const finalOutputPath = path.join(
      PROCESSED_VIDEOS_DIR,
      `${sanitizedTitle}.mp4`,
    );

    console.log('[Video Processing] Step 1/3: Generating intro video');
    await generateIntroVideo({
      introFramePath: INTRO_FRAME_PATH,
      outputPath: introVideoPath,
      durationSeconds: introDuration,
      width: VIDEO_DIMENSIONS.width,
      height: VIDEO_DIMENSIONS.height,
    });
    console.log('[Video Processing] ✓ Intro video generated\n');

    console.log(
      '[Video Processing] Step 2/3: Adding logo overlay to main video',
    );
    await addLogoOverlay({
      inputVideoPath: options.inputVideoPath,
      logoPath: LOGO_PATH,
      outputPath: overlayVideoPath,
      logoPosition,
      overlayText,
    });
    console.log('[Video Processing] ✓ Logo overlay added\n');

    console.log('[Video Processing] Step 3/3: Concatenating videos');
    await concatenateVideos({
      introPart: introVideoPath,
      mainPart: overlayVideoPath,
      outputPath: finalOutputPath,
    });
    console.log('[Video Processing] ✓ Videos concatenated\n');

    console.log('[Video Processing] Cleaning up temporary files...');
    await unlink(introVideoPath).catch(() => {});
    await unlink(overlayVideoPath).catch(() => {});
    console.log('[Video Processing] ✓ Temporary files cleaned up\n');

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('========================================');
    console.log(
      '[Video Processing] ✅ Video processing completed successfully!',
    );
    console.log(`[Video Processing] Output: ${finalOutputPath}`);
    console.log(`[Video Processing] Total time: ${duration}s`);
    console.log('========================================\n');

    return {
      success: true,
      outputPath: finalOutputPath,
    };
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error('\n========================================');
    console.error('[Video Processing] ❌ Video processing failed!');
    console.error(`[Video Processing] Error: ${errorMessage}`);
    console.error(`[Video Processing] Total time: ${duration}s`);
    console.error('========================================\n');

    return {
      success: false,
      error: errorMessage,
    };
  }
}
