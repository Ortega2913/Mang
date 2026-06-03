import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { ParticleField } from "../components/ParticleField";

const CreditItem: React.FC<{ label: string; value: string; startFrame: number }> = ({
  label,
  value,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const opacity = interpolate(local, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(local, [0, 20], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, marginBottom: 20 }}>
      <div style={{ fontSize: 11, letterSpacing: 4, color: "#4A9EFF", fontFamily: "monospace", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 22, color: "#F0EDE8", fontFamily: "'Georgia', serif", marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
};

const ThemeVerse: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [60, 90, 200, 230], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame, [60, 90], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        textAlign: "center",
        padding: "0 80px",
        marginBottom: 40,
      }}
    >
      <div
        style={{
          fontSize: 22,
          color: "#E8D5A3",
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          lineHeight: 1.8,
          marginBottom: 12,
        }}
      >
        "Be still, and know that I am God."
      </div>
      <div style={{ fontSize: 13, color: "#666", letterSpacing: 3, fontFamily: "monospace" }}>
        — Psalm 46:10
      </div>
    </div>
  );
};

export const CreditsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [260, 290], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titleScale = spring({ frame, fps, config: { damping: 60, stiffness: 50 }, from: 0.8, to: 1 });
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      <ParticleField color="#2A4A6A" />

      {/* THE END */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 16,
            letterSpacing: 12,
            color: "#4A9EFF",
            fontFamily: "'Georgia', serif",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          FADE OUT
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Georgia', serif",
            letterSpacing: 8,
            textShadow: "0 0 40px rgba(255,255,255,0.2)",
          }}
        >
          THE END
        </div>
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            width: 400,
            margin: "20px auto",
          }}
        />
      </div>

      {/* Theme verse */}
      <ThemeVerse />

      {/* Credits */}
      <div style={{ textAlign: "center", zIndex: 10 }}>
        <CreditItem label="Written for the stage" value="Echoes in the Void" startFrame={90} />
        <CreditItem label="Genre" value="Dramatic Short Play · ~10 min runtime" startFrame={110} />
        <CreditItem label="Cast" value="ALEX · MIRA · GRANDMA ROSE · VOICE OF GOD" startFrame={130} />
      </div>

      {/* Final fade message */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          opacity: interpolate(frame, [180, 210, 250, 270], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          fontSize: 13,
          color: "#334",
          letterSpacing: 5,
          fontFamily: "monospace",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        One honest prayer is louder than a thousand scrolls.
      </div>
    </div>
  );
};
