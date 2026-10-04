import { ImageResponse } from "next/og";

export const alt = "Tarun's World — Software, Intelligence & Machines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 64px",
          background: "#050607",
          color: "#f2efe8",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            border: "1px solid rgba(255,74,56,.28)",
            borderRadius: 999,
            right: -90,
            top: -170,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            border: "1px solid rgba(242,239,232,.12)",
            borderRadius: 999,
            right: 35,
            top: -80,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span>TARUN KUMAR SAHU</span>
          <span style={{ color: "#ff4a38" }}>PORTFOLIO / 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              lineHeight: 0.82,
              letterSpacing: "-0.065em",
            }}
          >
            TARUN&apos;S
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 120,
              lineHeight: 0.82,
              letterSpacing: "-0.055em",
              color: "#ff4a38",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            WORLD.
          </div>
          <div
            style={{
              marginTop: 30,
              maxWidth: 820,
              fontSize: 28,
              lineHeight: 1.2,
              color: "rgba(242,239,232,.72)",
            }}
          >
            Software engineering, AI systems, robotics, computer vision and connected hardware.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(242,239,232,.16)",
            paddingTop: 20,
            fontSize: 15,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(242,239,232,.62)",
          }}
        >
          <span>AI / BACKEND / SYSTEMS / MACHINES</span>
          <span>BUILD → BREAK → REBUILD</span>
        </div>
      </div>
    ),
    size,
  );
}
