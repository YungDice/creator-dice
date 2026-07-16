import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const root = process.cwd();

const models = [
  {
    output: "public/models/sony_wh-1000xm5.glb",
    expectedGzipSha256: "cfc4b31fff0f96c30fddb7632f5a25bb66b56bd15f9f767fa91f7298bc9454a9",
    parts: [
      "assets/model-payloads/v2/sony_wh-1000xm5.glb.gz.b64.00",
      "assets/model-payloads/v2/sony_wh-1000xm5.glb.gz.b64.01a",
      "assets/model-payloads/v2/sony_wh-1000xm5.glb.gz.b64.01b",
      "assets/model-payloads/v2/sony_wh-1000xm5.glb.gz.b64.02",
    ],
  },
  {
    output: "public/models/blue_yeti_microphone.glb",
    expectedGzipSha256: "493416203e09ca86ed3a64c373bc656ed98ac5ed301ff6ce011af0a32a8350c7",
    parts: [
      "assets/model-payloads/v2/blue_yeti_microphone.glb.gz.b64.00",
      "assets/model-payloads/v2/blue_yeti_microphone.glb.gz.b64.01a",
      "assets/model-payloads/v2/blue_yeti_microphone.glb.gz.b64.01b",
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
