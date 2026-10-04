/**
 * Fern frond, taken from the fronds on either side of the BANZ seal
 * (New Zealand's silver fern). A decorative ornament for maroon sections.
 */
export function Fern({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const leaflets: string[] = [];
  const count = 16;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    // Position along a gently curving stem from bottom (y=390) to tip (y=20).
    const y = 380 - t * 350;
    const x = 60 + Math.sin(t * 1.4) * 18;
    const len = 44 * (1 - t * 0.8) + 6;
    const w = len * 0.28;
    for (const side of [-1, 1]) {
      const angle = side * (58 - t * 18);
      leaflets.push(
        `<ellipse cx="${x + (side * len) / 2}" cy="${y}" rx="${len / 2}" ry="${w / 2}" transform="rotate(${-angle} ${x} ${y})" />`,
      );
    }
  }
  return (
    <svg
      viewBox="0 0 120 400"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
      fill="currentColor"
    >
      <path d="M60 398 C 62 300, 70 160, 78 22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g dangerouslySetInnerHTML={{ __html: leaflets.join("") }} />
    </svg>
  );
}
