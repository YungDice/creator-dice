import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const root = process.cwd();

const models = [
  {
    output: "public/models/sony_wh-1000xm5.glb",
    expectedGzipSha256: "0d0188b8a43f6e322c88aa16f7eb4b705c6ab0a56ef5c1ca02187c0ae61972ea",
    parts: [
      "assets/model-payloads/sony_wh-1000xm5.glb.gz.b64.00",
      "assets/model-payloads/sony_wh-1000xm5.glb.gz.b64.01",
    ],
  },
  {
    output: "public/models/blue_yeti_microphone.glb",
    expectedGzipSha256: "611242b6e17ee8706ddcf3980d265c481fd9ddbd3dd7213ab7fdb640c737f0e3",
    parts: ["assets/model-payloads/blue_yeti_microphone.glb.gz.b64.00"],
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
