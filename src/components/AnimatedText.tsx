import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface AnimatedTextProps {
  text: string;
  startFrame?: number;
  style?: React.CSSProperties;
  delay?: number;
  mode?: "fade" | "slide-up" | "typewriter" | "spring";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  startFrame = 0,
  style = {},
  delay = 0,
  mode = "fade",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame - delay;

  const opacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(localFrame, [0, 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 80, stiffness: 200 },
    from: 0.85,
    to: 1,
  });

  const getStyle = (): React.CSSProperties => {
    if (mode === "slide-up") return { opacity, transform: `translateY(${translateY}px)` };
    if (mode === "spring") return { opacity, transform: `scale(${scale})` };
    return { opacity };
  };

  if (mode === "typewriter") {
    const charsToShow = Math.floor(interpolate(localFrame, [0, text.length * 2], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }));
    return (
      <span style={{ ...style, opacity }}>
        {text.slice(0, charsToShow)}
        {charsToShow < text.length && <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>|</span>}
      </span>
    );
  }

  return <span style={{ ...style, ...getStyle() }}>{text}</span>;
};

interface DialogueLineProps {
  character: string;
  text: string;
  startFrame: number;
  characterColor?: string;
}

export const DialogueLine: React.FC<DialogueLineProps> = ({
  character,
  text,
  startFrame,
  characterColor = "#FFD700",
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const opacity = interpolate(localFrame, [0, 15, 90, 110], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(localFrame, [0, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: "20px 40px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: characterColor,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "'Georgia', serif",
          marginBottom: 8,
        }}
      >
        {character}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#F0EDE8",
          fontFamily: "'Georgia', serif",
          lineHeight: 1.6,
          fontStyle: "italic",
        }}
      >
        {text}
      </div>
    </div>
  );
};
