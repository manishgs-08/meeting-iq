/**
 * Supported audio file formats.
 *
 * This is the single source of truth for allowed audio extensions.
 * Mirrors the backend validation in app/utils/file_validation.py.
 */
export const SUPPORTED_AUDIO_EXTENSIONS: ReadonlySet<string> = new Set([
  "mp3",
  "wav",
  "m4a",
  "flac",
  "ogg",
  "opus",
  "webm",
]);

/** Comma-separated list of supported formats for display in UI text. */
export const SUPPORTED_FORMATS_DISPLAY: string = Array.from(
  SUPPORTED_AUDIO_EXTENSIONS
)
  .map((ext) => `.${ext}`)
  .sort()
  .join(", ");

/** Accept string for the HTML file input element. */
export const AUDIO_ACCEPT_STRING: string = Array.from(
  SUPPORTED_AUDIO_EXTENSIONS
)
  .map((ext) => `.${ext}`)
  .join(",");
