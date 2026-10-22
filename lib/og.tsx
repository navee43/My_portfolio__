import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const INK = "#17123a";
const PAPER = "#f6f5fb";
const MARIGOLD = "#ffb21e";
const LILAC = "#d9d4ff";
const MINT = "#c8f2dd";
const PINK = "#ffc2dc";

async function fonts() {
  // Literal paths so the font files are traced into the deployment bundle.
  const [narrow, medium, heavy] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/ArchivoNarrow-Bold.woff")),
    readFile(join(process.cwd(), "assets/fonts/Archivo-Medium.woff")),
    readFile(join(process.cwd(), "assets/fonts/Archivo-ExtraBold.woff")),
  ]);
  return [
    { name: "Archivo Narrow", data: narrow, weight: 700 as const, style: "normal" as const },
    { name: "Archivo", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Archivo", data: heavy, weight: 800 as const, style: "normal" as const },
  ];
}

/** The NY monogram as plain SVG (share images can't read CSS variables). */
function MonogramSvg({ size }: { size: number }) {
  const pts: [number, number][] = [
    [4, 26],
    [4, 4],
    [17, 26],
    [17, 4],
    [23, 4],
    [37, 4],
    [30, 26],
  ];
  return (
    <svg width={size * (41 / 30)} height={size} viewBox="0 0 41 30">
      <path d="M4 26V4l13 22V4" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 4l7 10.5L37 4M30 14.5V26" fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={2.6} fill={PAPER} stroke={INK} strokeWidth={1.8} />
      ))}
      <circle cx={30} cy={14.5} r={3.6} fill={MARIGOLD} stroke={INK} strokeWidth={1.2} />
    </svg>
  );
}

function Sticker({ label, bg, rotate }: { label: string; bg: string; rotate: number }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "10px 20px",
        border: `3px solid ${INK}`,
        borderRadius: 14,
        background: bg,
        boxShadow: `4px 4px 0 0 ${INK}`,
        transform: `rotate(${rotate}deg)`,
        fontFamily: "Archivo",
        fontWeight: 800,
        fontSize: 24,
        color: INK,
      }}
    >
      {label}
    </div>
  );
}

/** A shared share-card layout for the homepage and each case study, in the sticker style. */
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  stickers = ["Full-stack", "AI agents", "Open to opportunities"],
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  stickers?: string[];
}) {
  const colors = [MARIGOLD, LILAC, MINT, PINK];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 68px",
          background: PAPER,
          backgroundImage: `radial-gradient(circle, rgba(23,18,58,0.13) 1.5px, transparent 1.6px)`,
          backgroundSize: "22px 22px",
          fontFamily: "Archivo",
          color: INK,
          border: `10px solid ${INK}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <MonogramSvg size={44} />
            <div style={{ display: "flex", fontFamily: "Archivo Narrow", fontSize: 34, letterSpacing: "0.01em" }}>
              NAVEEN YADAV
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              border: `3px solid ${INK}`,
              borderRadius: 999,
              background: "#ffffff",
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo Narrow",
              fontSize: title.length > 36 ? 84 : 104,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 14, height: 12, width: 260, background: MARIGOLD, borderRadius: 4 }} />
          <div style={{ display: "flex", marginTop: 20, fontSize: 28, fontWeight: 500, maxWidth: 960, lineHeight: 1.3, color: "#2a2456" }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {stickers.map((s, i) => (
            <Sticker key={s} label={s} bg={colors[i % colors.length]} rotate={i % 2 === 0 ? -3 : 3} />
          ))}
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
