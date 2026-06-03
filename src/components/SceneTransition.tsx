import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface SceneTransitionProps {
  label: string;
  startFrame: number;
  duration?: number;
  color?: string;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  label,
  startFrame,
  duration = 60,
  color = "#0A0A0A",
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  if (local < 0 || local > duration) return null;

  const fadeIn = interpolate(local, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(local, [duration - 15, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const textOpacity = interpolate(local, [10, 25, duration - 20, duration - 10], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(local, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <div
        style={{
          opacity: textOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: 6,
            color: "#4A9EFF",
            fontFamily: "'Georgia', serif",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          CUT TO
        </div>
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #4A9EFF, transparent)",
            width: `${lineWidth * 200}px`,
            margin: "0 auto 12px",
          }}
        />
        <div
          style={{
            fontSize: 20,
            color: "#AAA",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
