import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const root = process.cwd();

const models = [
  {
    output: "public/models/sony_wh-1000xm5.glb",
    expectedGzipSha256: "ae8882be7bd9d87eeca34448cb7295b2b1719c04c48326547437dad0c0895727",
    parts: [
      "assets/model-payloads-v2/sony.00",
      "assets/model-payloads-v2/sony.01",
      "assets/model-payloads-v2/sony.02",
    ],
  },
  {
    output: "public/models/blue_yeti_microphone.glb",
    expectedGzipSha256: "3f566aad8fc03aeae5d504f0eed188d871cd85094630dc4b71058b34a850fa07",
    parts: [
      "assets/model-payloads-v2/yeti.00",
      "assets/model-payloads-v2/yeti.01",
    ],
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
