// Tonos derivados del color principal de una app (hex #rrggbb).
// deep = mismo color, más intenso (más saturado y algo más oscuro, sin ir al negro).
// soft = mismo color, más claro.
const toHsl = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
};

const hsl = (h: number, s: number, l: number) => `hsl(${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;

export function brandShades(hex: string) {
  const { h, s, l } = toHsl(hex);
  return {
    deep: hsl(h, Math.min(1, s * 1.02 + 0.05), l * 0.85),
    soft: hsl(h, s, Math.min(0.9, l + (1 - l) * 0.36)),
  };
}
