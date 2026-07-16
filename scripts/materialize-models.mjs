import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const root = process.cwd();

const models = [
  {
    output: "public/models/sony_wh-1000xm5.glb",
    expectedGzipSha256: "597254fee444302818171366a888efa3b5ca7fc3b1cc6b5df84a846dc3a140e8",
    parts: ["assets/model-payloads/v3/sony_wh-1000xm5.glb.gz.b64"],
  },
  {
    output: "public/models/blue_yeti_microphone.glb",
    expectedGzipSha256: "944f8710c25eb8dd6a1b4d4e92a2e5674e92cf2645e400d9b261c9b6d0681fcc",
    parts: ["assets/model-payloads/v3/blue_yeti_microphone.glb.gz.b64"],
  },
];

for (const model of models) {
  const encodedParts = await Promise.all(
    model.parts.map(async (part) => (await readFile(resolve(root, part), "utf8")).trim()),
  );
  const compressed = Buffer.from(encodedParts.join(""), "base64");
  const hash = createHash("sha256").update(compressed).digest("hex");

  if (hash !== model.expectedGzipSha256) {
    throw new Error(`Model payload checksum mismatch for ${model.output}: ${hash}`);
  }

  const glb = gunzipSync(compressed);
  if (glb.subarray(0, 4).toString("ascii") !== "glTF") {
    throw new Error(`Decoded model is not a valid GLB: ${model.output}`);
  }

  const outputPath = resolve(root, model.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, glb);
  console.log(`materialized ${model.output} (${glb.length} bytes)`);
}
