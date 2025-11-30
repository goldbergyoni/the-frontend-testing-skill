import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ASSETS_DIR = path.join(__dirname, "../../assets");
export const INTRO_FRAME_PATH = path.join(ASSETS_DIR, "intro-frame.jpeg");
export const LOGO_PATH = path.join(ASSETS_DIR, "logo.jpeg");

export const DEFAULT_INTRO_DURATION_SECONDS = 3;
export const DEFAULT_LOGO_POSITION = { x: 20, y: 20 };
export const DEFAULT_OVERLAY_TEXT = "Visual review";

export const VIDEO_DIMENSIONS = {
  width: 1920,
  height: 1080,
};

export const PROCESSED_VIDEOS_DIR = path.join(
  __dirname,
  "../../../test-results/processed-videos"
);

export const TEMP_DIR = path.join(__dirname, "../../../test-results/temp");
