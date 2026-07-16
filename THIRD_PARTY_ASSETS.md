# Third-party 3D assets

## Shelf figurines

The shelf collectibles are original, lightweight anime-style figurines built directly from Three.js primitives in `components/three/VroidFigure.tsx`. The previous VRoid Studio sample models are no longer loaded or distributed.

## Desk audio models

The website includes optimized derivatives of the following downloadable Sketchfab models. Their geometry was simplified and materials were reduced for real-time web rendering; attribution and the original license still apply.

### Sony WH-1000XM5

- Creator: Zalaneke (`@Zalanekee`)
- Source: https://sketchfab.com/3d-models/sony-wh-1000xm5-5d8aea0a780b49fa89c9c205912414e3
- License: Creative Commons Attribution 4.0 (CC BY 4.0)
- License text: https://creativecommons.org/licenses/by/4.0/

### Blue Yeti Microphone

- Creator: Antony Morsas (`@antonymorsas`)
- Source: https://sketchfab.com/3d-models/blue-yeti-microphone-8ee3f06179d24078bf39a44e0bd9ae7a
- License: Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)
- License text: https://creativecommons.org/licenses/by-nc/4.0/

The Blue Yeti model is licensed for non-commercial use. Obtain separate permission from the creator before using this model in a commercial project or commercial promotion.

## Repository asset format

The optimized model files are stored as compressed base64 payload fragments in `assets/model-payloads/v2`. The `predev` and `prebuild` scripts verify their SHA-256 checksums and materialize the GLB files under `public/models` before Next.js starts or builds.
