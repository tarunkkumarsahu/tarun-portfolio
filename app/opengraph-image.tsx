import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

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
          padding: "70px",
          background: "#08090b",
          color: "#f3f0e8",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: "0.16em",
            color: "#8fa3c0",
          }}
        >
          <span>TARUN KUMAR SAHU</span>
          <span>2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 0.8,
              letterSpacing: "-0.07em",
            }}
          >
            SOFTWARE.
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 0.8,
              letterSpacing: "-0.07em",
              color: "#8fa3c0",
            }}
          >
            INTELLIGENCE.
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 0.8,
              letterSpacing: "-0.07em",
            }}
          >
            MACHINES.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#b7b4ad",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#ff4a38",
            }}
          />
          AI / BACKEND / COMPUTER VISION / ROBOTICS
        </div>
      </div>
    ),
    size,
  );
}
