import { ImageResponse } from "next/og";

export const alt = "Rentora – find basha vara across Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background:
          "linear-gradient(135deg, #047857 0%, #059669 55%, #10b981 100%)",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <svg
          width="104"
          height="104"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        <span style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4 }}>
          Rentora
        </span>
      </div>
      <div style={{ marginTop: 36, fontSize: 48, opacity: 0.95 }}>
        Find basha vara across Bangladesh
      </div>
      <div style={{ marginTop: 16, fontSize: 32, opacity: 0.8 }}>
        Flats, houses, studios &amp; hostels for rent – listed by landlords
      </div>
    </div>,
    size,
  );
}
