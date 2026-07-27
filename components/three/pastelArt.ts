import * as THREE from "three";

/**
 * Procedural artwork for the pastel gaming room: the fantasy wallpapers shown
 * on the side monitors and the poster collage on the wall. Everything is
 * original generated art — no image assets, deterministic via seeded RNG.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Clone a loaded texture and crop it to fill a plane (CSS object-fit: cover). */
export function coverTexture(tex: THREE.Texture, planeAspect: number): THREE.Texture {
  const img = tex.image as HTMLImageElement;
  const t = tex.clone();
  t.needsUpdate = true;
  const imgAspect = img.width / img.height;
  if (imgAspect > planeAspect) {
    t.repeat.set(planeAspect / imgAspect, 1);
    t.offset.set((1 - t.repeat.x) / 2, 0);
  } else {
    t.repeat.set(1, imgAspect / planeAspect);
    t.offset.set(0, (1 - t.repeat.y) / 2);
  }
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Dark charcoal wall with subtle block joints and plaster noise. */
export function makeDarkWallTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const g = canvas.getContext("2d")!;
  const rnd = mulberry32(909);

  g.fillStyle = "#292A2E";
  g.fillRect(0, 0, 1024, 1024);
  // Soft tonal patches
  for (let i = 0; i < 40; i++) {
    const x = rnd() * 1024;
    const y = rnd() * 1024;
    const r = 60 + rnd() * 160;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    const tone = rnd() > 0.5 ? "255,255,255" : "0,0,0";
    grad.addColorStop(0, `rgba(${tone},0.035)`);
    grad.addColorStop(1, `rgba(${tone},0)`);
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // Cinder-block joints
  g.strokeStyle = "rgba(0,0,0,0.16)";
  g.lineWidth = 2;
  const bh = 128;
  const bw = 256;
  for (let row = 0; row * bh < 1024; row++) {
    const y = row * bh;
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(1024, y);
    g.stroke();
    const offset = row % 2 === 0 ? 0 : bw / 2;
    for (let x = offset; x < 1024; x += bw) {
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x, y + bh);
      g.stroke();
    }
  }
  // Grain
  g.globalAlpha = 0.05;
  for (let i = 0; i < 900; i++) {
    g.fillStyle = rnd() > 0.5 ? "#FFFFFF" : "#000000";
    g.fillRect(rnd() * 1024, rnd() * 1024, 1.6, 1.6);
  }
  g.globalAlpha = 1;

  const tex = toTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function star(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  g.save();
  g.fillStyle = color;
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const d = i % 2 === 0 ? r : r * 0.32;
    g.lineTo(x + Math.cos(a) * d, y + Math.sin(a) * d);
  }
  g.closePath();
  g.fill();
  g.restore();
}

/** A pale silver-haired figure with closed eyes amid flowing white/blue shapes. */
export function makeFantasyArt(variant: "center" | "portrait"): THREE.CanvasTexture {
  const w = variant === "center" ? 1152 : 800;
  const h = variant === "center" ? 648 : 1418;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d")!;
  const rnd = mulberry32(variant === "center" ? 11 : 77);

  // Soft pastel backdrop
  const bg = g.createLinearGradient(0, 0, w * 0.3, h);
  bg.addColorStop(0, "#F4EBF2");
  bg.addColorStop(0.5, "#D9E6F5");
  bg.addColorStop(1, "#AECBEA");
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  const blobColors = ["240,196,210", "170,205,240", "255,255,255", "205,192,236"];
  for (let i = 0; i < 10; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = (0.15 + rnd() * 0.3) * Math.max(w, h);
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    const c = blobColors[i % blobColors.length];
    grad.addColorStop(0, `rgba(${c},0.4)`);
    grad.addColorStop(1, `rgba(${c},0)`);
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Flowing ribbons of white and pale blue
  const ribbonColors = [
    "rgba(255,255,255,0.95)",
    "rgba(205,224,243,0.85)",
    "rgba(240,244,249,0.85)",
    "rgba(157,196,236,0.75)",
  ];
  g.lineCap = "round";
  for (let i = 0; i < 26; i++) {
    const y0 = rnd() * h;
    g.strokeStyle = ribbonColors[i % ribbonColors.length];
    g.lineWidth = 5 + rnd() * (variant === "center" ? 34 : 26);
    g.shadowColor = "rgba(255,255,255,0.8)";
    g.shadowBlur = 14;
    g.beginPath();
    g.moveTo(-40, y0);
    g.bezierCurveTo(
      w * (0.2 + rnd() * 0.3), y0 + (rnd() - 0.5) * h * 0.8,
      w * (0.5 + rnd() * 0.3), y0 + (rnd() - 0.5) * h * 0.8,
      w + 40, rnd() * h,
    );
    g.stroke();
  }
  g.shadowBlur = 0;

  // The figure
  const cx = variant === "center" ? w * 0.38 : w * 0.5;
  const cy = variant === "center" ? h * 0.42 : h * 0.34;
  const R = variant === "center" ? h * 0.21 : w * 0.32;

  // Hair mass behind the face
  g.lineCap = "round";
  for (let i = 0; i < 46; i++) {
    const a = rnd() * Math.PI * 2;
    const sx = cx + Math.cos(a) * R * 0.7;
    const sy = cy + Math.sin(a) * R * 0.5 - R * 0.3;
    const flow = 1 + rnd() * 1.6;
    g.strokeStyle = ["#FFFFFF", "#E8EDF3", "#C8D5E4", "#A9BFD6"][i % 4];
    g.globalAlpha = 0.75 + rnd() * 0.25;
    g.lineWidth = R * (0.06 + rnd() * 0.16);
    g.beginPath();
    g.moveTo(sx, sy);
    g.bezierCurveTo(
      sx + (rnd() - 0.5) * R * 2, sy + R * flow * 0.6,
      sx + (rnd() - 0.5) * R * 2.6, sy + R * flow * 1.1,
      sx + (rnd() - 0.5) * R * 3.4, sy + R * flow * 1.7,
    );
    g.stroke();
  }
  g.globalAlpha = 1;

  // Face
  g.fillStyle = "#F9ECE6";
  g.beginPath();
  g.ellipse(cx, cy, R * 0.62, R * 0.72, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "rgba(196,160,152,0.6)";
  g.lineWidth = R * 0.025;
  g.stroke();
  // Blush
  for (const side of [-1, 1]) {
    const bx = cx + side * R * 0.34;
    const by = cy + R * 0.22;
    const grad = g.createRadialGradient(bx, by, 0, bx, by, R * 0.16);
    grad.addColorStop(0, "rgba(242,183,190,0.55)");
    grad.addColorStop(1, "rgba(242,183,190,0)");
    g.fillStyle = grad;
    g.fillRect(bx - R * 0.2, by - R * 0.2, R * 0.4, R * 0.4);
  }
  // Closed eyes with lashes
  g.strokeStyle = "#6B6572";
  g.lineWidth = R * 0.045;
  for (const side of [-1, 1]) {
    const ex = cx + side * R * 0.28;
    const ey = cy + R * 0.05;
    g.beginPath();
    g.arc(ex, ey, R * 0.14, Math.PI * 0.15, Math.PI * 0.85);
    g.stroke();
    for (let l = 0; l < 3; l++) {
      const la = Math.PI * (0.3 + l * 0.2);
      g.beginPath();
      g.moveTo(ex + Math.cos(la) * R * 0.14, ey + Math.sin(la) * R * 0.14);
      g.lineTo(ex + Math.cos(la) * R * 0.19, ey + Math.sin(la) * R * 0.19);
      g.stroke();
    }
  }
  // Brows
  g.strokeStyle = "rgba(107,101,114,0.5)";
  g.lineWidth = R * 0.03;
  for (const side of [-1, 1]) {
    g.beginPath();
    g.arc(cx + side * R * 0.28, cy - R * 0.08, R * 0.15, Math.PI * 1.2, Math.PI * 1.8);
    g.stroke();
  }
  // Small mouth
  g.strokeStyle = "#D89AA0";
  g.lineWidth = R * 0.04;
  g.beginPath();
  g.arc(cx, cy + R * 0.4, R * 0.08, Math.PI * 0.2, Math.PI * 0.8);
  g.stroke();
  // Forehead gem
  g.fillStyle = "#9FD8F0";
  g.save();
  g.translate(cx, cy - R * 0.32);
  g.rotate(Math.PI / 4);
  g.fillRect(-R * 0.045, -R * 0.045, R * 0.09, R * 0.09);
  g.restore();

  // Front hair strands framing the face
  for (let i = 0; i < 20; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const sx = cx + side * R * (0.1 + rnd() * 0.4);
    const sy = cy - R * (0.55 + rnd() * 0.15);
    g.strokeStyle = ["#FBFCFD", "#E2E9F1", "#C3D2E2"][i % 3];
    g.lineWidth = R * (0.05 + rnd() * 0.12);
    g.beginPath();
    g.moveTo(sx, sy);
    g.bezierCurveTo(
      sx + side * R * (0.3 + rnd() * 0.3), sy + R * 0.5,
      sx + side * R * (0.5 + rnd() * 0.4), sy + R * 1.1,
      sx + side * R * (0.5 + rnd() * 0.7), sy + R * (1.5 + rnd() * 0.7),
    );
    g.stroke();
  }

  // Petals and sparkles
  for (let i = 0; i < 14; i++) {
    g.save();
    g.translate(rnd() * w, rnd() * h);
    g.rotate(rnd() * Math.PI);
    g.fillStyle = `rgba(150,192,235,${0.45 + rnd() * 0.4})`;
    g.beginPath();
    g.ellipse(0, 0, 5 + rnd() * 9, 3 + rnd() * 5, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  for (let i = 0; i < 30; i++) {
    star(g, rnd() * w, rnd() * h, 2 + rnd() * 6, `rgba(255,255,255,${0.5 + rnd() * 0.5})`);
  }

  return toTexture(canvas);
}

/** Monochrome-ish art posters: black/white/grey/dark-green/muted-red. */
export function makePosterTexture(seed: number, landscape = false): THREE.CanvasTexture {
  const w = landscape ? 540 : 380;
  const h = landscape ? 380 : 540;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d")!;
  const rnd = mulberry32(seed * 7919 + 13);

  const papers = ["#F2F0EB", "#17181A", "#8E8E8A", "#2F4A3B", "#9E4034", "#F2F0EB", "#17181A"];
  const paper = papers[Math.floor(rnd() * papers.length)];
  const darkPaper = paper === "#17181A" || paper === "#2F4A3B" || paper === "#9E4034";
  const ink = darkPaper ? "#EDEAE4" : "#1C1D1F";
  g.fillStyle = paper;
  g.fillRect(0, 0, w, h);

  g.strokeStyle = ink;
  g.fillStyle = ink;
  g.lineCap = "round";
  const cx = w / 2;
  const cy = h * 0.46;

  const style = Math.floor(rnd() * 7);
  if (style === 0) {
    // Fantasy eye
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(w * 0.15, cy);
    g.quadraticCurveTo(cx, cy - h * 0.16, w * 0.85, cy);
    g.quadraticCurveTo(cx, cy + h * 0.16, w * 0.15, cy);
    g.stroke();
    g.beginPath();
    g.arc(cx, cy, h * 0.085, 0, Math.PI * 2);
    g.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * h * 0.04, cy + Math.sin(a) * h * 0.04);
      g.lineTo(cx + Math.cos(a) * h * 0.075, cy + Math.sin(a) * h * 0.075);
      g.stroke();
    }
    for (let i = 0; i < 6; i++) {
      const t = 0.22 + i * 0.11;
      g.beginPath();
      g.moveTo(w * t, cy - h * 0.13 + Math.abs(t - 0.5) * h * 0.12);
      g.lineTo(w * (t - 0.04), cy - h * 0.21 + Math.abs(t - 0.5) * h * 0.12);
      g.stroke();
    }
  } else if (style === 1) {
    // Line flower
    g.lineWidth = 4;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      g.save();
      g.translate(cx, cy - h * 0.08);
      g.rotate(a);
      g.beginPath();
      g.ellipse(0, -h * 0.11, w * 0.09, h * 0.11, 0, 0, Math.PI * 2);
      g.stroke();
      g.restore();
    }
    g.beginPath();
    g.arc(cx, cy - h * 0.08, w * 0.05, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.moveTo(cx, cy + h * 0.03);
    g.quadraticCurveTo(cx - w * 0.08, cy + h * 0.22, cx, h * 0.88);
    g.stroke();
  } else if (style === 2) {
    // Face profile silhouette
    g.beginPath();
    g.moveTo(cx - w * 0.05, h * 0.12);
    g.bezierCurveTo(cx + w * 0.3, h * 0.14, cx + w * 0.28, h * 0.4, cx + w * 0.12, h * 0.48);
    g.bezierCurveTo(cx + w * 0.22, h * 0.52, cx + w * 0.14, h * 0.58, cx + w * 0.1, h * 0.62);
    g.bezierCurveTo(cx + w * 0.12, h * 0.72, cx - w * 0.1, h * 0.82, cx - w * 0.28, h * 0.78);
    g.lineTo(cx - w * 0.28, h * 0.2);
    g.closePath();
    g.fill();
  } else if (style === 3) {
    // Abstract brush strokes
    for (let i = 0; i < 7; i++) {
      g.lineWidth = 8 + rnd() * 22;
      g.globalAlpha = 0.55 + rnd() * 0.45;
      g.beginPath();
      g.moveTo(rnd() * w, rnd() * h);
      g.quadraticCurveTo(rnd() * w, rnd() * h, rnd() * w, rnd() * h);
      g.stroke();
    }
    g.globalAlpha = 1;
  } else if (style === 4) {
    // Manga speed-line panel
    for (let i = 0; i < 42; i++) {
      const a = rnd() * Math.PI * 2;
      g.lineWidth = 1.5 + rnd() * 2.5;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * w * 0.16, cy + Math.sin(a) * w * 0.16);
      g.lineTo(cx + Math.cos(a) * w, cy + Math.sin(a) * w);
      g.stroke();
    }
    g.beginPath();
    g.arc(cx, cy, w * 0.13, 0, Math.PI * 2);
    g.fillStyle = paper;
    g.fill();
    g.lineWidth = 4;
    g.strokeStyle = ink;
    g.stroke();
  } else if (style === 5) {
    // Crescent moon and stars
    g.beginPath();
    g.arc(cx, cy, w * 0.24, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = paper;
    g.beginPath();
    g.arc(cx + w * 0.12, cy - w * 0.07, w * 0.21, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = ink;
    for (let i = 0; i < 7; i++) star(g, rnd() * w, rnd() * h, 3 + rnd() * 7, ink);
  } else {
    // Snake / wave pattern
    g.lineWidth = 6;
    for (let r = 0; r < 5; r++) {
      g.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const y = cy + (r - 2) * h * 0.12 + Math.sin((x / w) * Math.PI * 3 + r) * h * 0.05;
        x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke();
    }
  }

  // Caption bar + paper grain
  g.fillStyle = ink;
  g.globalAlpha = 0.85;
  g.fillRect(w * 0.3, h * 0.9, w * 0.4, 5);
  g.globalAlpha = 0.05;
  for (let i = 0; i < 260; i++) {
    g.fillStyle = darkPaper ? "#FFFFFF" : "#000000";
    g.fillRect(rnd() * w, rnd() * h, 1.4, 1.4);
  }
  g.globalAlpha = 1;

  return toTexture(canvas);
}

/** Round woven rug: concentric warm-toned rings with subtle fiber noise. */
export function makeRugTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext("2d")!;
  const rnd = mulberry32(515);
  const cx = size / 2;
  const cy = size / 2;

  g.fillStyle = "#241E1A";
  g.fillRect(0, 0, size, size);

  const rings = ["#2E2620", "#3A2C22", "#332822", "#4A3526", "#2A211C", "#8A5A36", "#3A2C22", "#2E2620"];
  let r = size / 2;
  let i = 0;
  while (r > 8) {
    const width = 10 + rnd() * 26;
    g.strokeStyle = rings[i % rings.length];
    g.lineWidth = width;
    g.beginPath();
    g.arc(cx, cy, r - width / 2, 0, Math.PI * 2);
    g.stroke();
    r -= width;
    i++;
  }

  // Braided-fiber texture: short arc strokes at random radii.
  g.lineCap = "round";
  for (let s = 0; s < 900; s++) {
    const rr = 10 + rnd() * (size / 2 - 12);
    const a = rnd() * Math.PI * 2;
    const arc = 0.02 + rnd() * 0.05;
    g.strokeStyle = rnd() > 0.5 ? "rgba(255,220,180,0.05)" : "rgba(0,0,0,0.09)";
    g.lineWidth = 1.5 + rnd() * 2.5;
    g.beginPath();
    g.arc(cx, cy, rr, a, a + arc);
    g.stroke();
  }

  // Amber border band.
  g.strokeStyle = "rgba(200,130,70,0.5)";
  g.lineWidth = 5;
  g.beginPath();
  g.arc(cx, cy, size / 2 - 14, 0, Math.PI * 2);
  g.stroke();

  return toTexture(canvas);
}

/** Dark wood plank flooring. */
export function makeDarkWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const g = canvas.getContext("2d")!;
  const rnd = mulberry32(4242);

  g.fillStyle = "#3E2A1C";
  g.fillRect(0, 0, 1024, 1024);
  const plankH = 128;
  for (let row = 0; row < 8; row++) {
    const y = row * plankH;
    const shade = 0.9 + rnd() * 0.25;
    g.fillStyle = `rgb(${Math.round(62 * shade)},${Math.round(42 * shade)},${Math.round(28 * shade)})`;
    g.fillRect(0, y, 1024, plankH);
    // grain
    for (let i = 0; i < 26; i++) {
      const gy = y + rnd() * plankH;
      g.strokeStyle = `rgba(20,12,6,${0.1 + rnd() * 0.18})`;
      g.lineWidth = 1 + rnd() * 2;
      g.beginPath();
      g.moveTo(0, gy);
      g.bezierCurveTo(300, gy + (rnd() - 0.5) * 10, 700, gy + (rnd() - 0.5) * 10, 1024, gy);
      g.stroke();
    }
    // plank gap
    g.fillStyle = "rgba(12,7,4,0.85)";
    g.fillRect(0, y + plankH - 3, 1024, 3);
    // butt joints
    const bx = rnd() * 1024;
    g.fillRect(bx, y, 3, plankH);
  }

  const tex = toTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}
