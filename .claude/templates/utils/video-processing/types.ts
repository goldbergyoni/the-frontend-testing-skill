export interface VideoProcessingOptions {
  inputVideoPath: string;
  outputDir: string;
  testTitle: string;
  introText?: string;
  introDurationSeconds?: number;
  logoPosition?: { x: number; y: number };
  overlayText?: string;
}

export interface VideoProcessingResult {
  success: boolean;
  outputPath?: string;
  error?: string;
}

export interface IntroVideoOptions {
  introFramePath: string;
  outputPath: string;
  durationSeconds: number;
  width: number;
  height: number;
}

export interface OverlayOptions {
  inputVideoPath: string;
  logoPath: string;
  outputPath: string;
  logoPosition: { x: number; y: number };
  overlayText: string;
}

export interface ConcatenateOptions {
  introPart: string;
  mainPart: string;
  outputPath: string;
}
