import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the NY node-graph monogram on ink. */
export default function AppleIcon() {
  const pts: [number, number][] = [
    [4, 26],
    [4, 4],
    [17, 26],
    [17, 4],
    [23, 4],
    [37, 4],
    [30, 26],
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#17123a" }}>
        <svg width={123} height={90} viewBox="0 0 41 30">
          <path d="M4 26V4l13 22V4" fill="none" stroke="#f4f2ff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 4l7 10.5L37 4M30 14.5V26" fill="none" stroke="#f4f2ff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          {pts.map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={2.7} fill="#17123a" stroke="#f4f2ff" strokeWidth={1.9} />
          ))}
          <circle cx={30} cy={14.5} r={3.8} fill="#ffb21e" stroke="#17123a" strokeWidth={1.2} />
        </svg>
      </div>
    ),
    size,
  );
}
