// Deadpan Forecasts for Cities That Do Not Exist — entry program.
// Runs on Node 22 with the standard library alone: no network calls,
// no randomness, and the same bytes out on every run.
// It produces exactly one file, entry.txt, holding a single line with
// no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Work out where the entry file goes: the harness may point us at a
// scratch directory through the environment, otherwise fall back to
// the conventional /output location used by the sealed scorer.
function resolveOutputPath(): { dir: string; path: string } {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return { dir, path: join(dir, "entry.txt") };
}

const { dir: OUT_DIR, path: OUT_PATH } = resolveOutputPath();

// Forecast line, 127 chars: an invented city plus concrete numbers
// (19 degrees, 1987), with the deadpan twist saved for the final words —
// a single cloud that has trailed one named resident since 1987.
const FORECAST_LINE =
  "Tonight in Port Widdershins, a high of 19 degrees, light rain, and one cloud that has been following Mrs. Abernathy since 1987.";

// The sealed scorer only accepts a single line of 1-160 UTF-8 characters
// that is not blank, so reject anything outside that shape up front.
function validateForecast(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 160 || !line.trim() || line.includes("\n")) {
    throw new Error("entry line violates the 1-160 char single-line gate");
  }
}

validateForecast(FORECAST_LINE);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, FORECAST_LINE, "utf8");
