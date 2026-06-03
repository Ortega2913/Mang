import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { ParticleField } from "../components/ParticleField";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 60, stiffness: 60 }, from: 0, to: 1 });
  const subtitleDelay = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 80, stiffness: 80 }, from: 0, to: 1 });
  const genreDelay = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 80, stiffness: 100 }, from: 0, to: 1 });
  const lineWidth = interpolate(Math.max(0, frame - 50), [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [140, 160], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const vignette = 0.6 + Math.sin(frame * 0.03) * 0.05;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(ellipse at center, #0D1B2A 0%, #050A10 60%, #000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      {/* Star field */}
      <ParticleField color="#4A9EFF" />

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignette}) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Decorative ring */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `1px solid rgba(74,158,255,${interpolate(frame, [20, 60], [0, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          transform: `scale(${0.8 + titleSpring * 0.4}) rotate(${frame * 0.1}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `1px solid rgba(74,158,255,${interpolate(frame, [30, 80], [0, 0.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          transform: `scale(${0.8 + subtitleDelay * 0.4}) rotate(${-frame * 0.06}deg)`,
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", textAlign: "center", zIndex: 10 }}>
        {/* "ECHOES IN THE" */}
        <div
          style={{
            fontSize: 20,
            letterSpacing: 12,
            color: "#7BAFD4",
            fontFamily: "'Georgia', serif",
            textTransform: "uppercase",
            opacity: subtitleDelay,
            transform: `translateY(${(1 - subtitleDelay) * -15}px)`,
            marginBottom: 8,
          }}
        >
          ECHOES IN THE
        </div>

        {/* "VOID" - main title */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Georgia', serif",
            letterSpacing: -2,
            lineHeight: 1,
            transform: `scale(${0.7 + titleSpring * 0.3})`,
            opacity: titleSpring,
            textShadow: `0 0 60px rgba(74,158,255,0.4), 0 0 120px rgba(74,158,255,0.15)`,
          }}
        >
          VOID
        </div>

        {/* Divider line */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #4A9EFF, transparent)",
            width: `${lineWidth * 400}px`,
            margin: "20px auto",
          }}
        />

        {/* Genre tag */}
        <div
          style={{
            fontSize: 13,
            letterSpacing: 6,
            color: "#4A9EFF",
            fontFamily: "'Georgia', serif",
            textTransform: "uppercase",
            opacity: genreDelay,
            transform: `translateY(${(1 - genreDelay) * 10}px)`,
            marginBottom: 16,
          }}
        >
          A Dramatic Short Play
        </div>

        {/* Cast intro */}
        <div
          style={{
            opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            display: "flex",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { name: "ALEX", desc: "22 · Restless" },
            { name: "MIRA", desc: "21 · Influencer" },
            { name: "GRANDMA ROSE", desc: "68 · Faithful" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: interpolate(frame, [90 + i * 15, 110 + i * 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                transform: `translateY(${interpolate(frame, [90 + i * 15, 110 + i * 15], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            >
              <div style={{ fontSize: 12, letterSpacing: 3, color: "#FFD700", fontFamily: "'Georgia', serif", fontWeight: 700 }}>
                {c.name}
              </div>
              <div style={{ fontSize: 10, color: "#666", fontFamily: "sans-serif", letterSpacing: 1 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom credit */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: interpolate(frame, [100, 120], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          fontSize: 11,
          color: "#445",
          letterSpacing: 4,
          fontFamily: "monospace",
          textTransform: "uppercase",
        }}
      >
        Runtime · Approx. 10 Minutes
      </div>
    </div>
  );
};
