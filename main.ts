// Deadpan Forecasts for Cities That Do Not Exist — entry program.
// Node 22, stdlib only, deterministic, no network.
// Writes exactly one line (no trailing newline) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

// One line, 127 chars: invented city + concrete numbers (19 degrees, 1987)
// with the deadpan twist landing in the final words — one cloud that has
// been following one named resident since 1987.
const LINE =
  "Tonight in Port Widdershins, a high of 19 degrees, light rain, and one cloud that has been following Mrs. Abernathy since 1987.";

// Gate guard: the sealed scorer accepts 1-160 UTF-8 chars, not only whitespace.
if ([...LINE].length < 1 || [...LINE].length > 160 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry line violates the 1-160 char single-line gate");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");
