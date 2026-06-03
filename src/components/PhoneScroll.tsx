import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

const FEED_ITEMS = [
  { user: "@luxelife", content: "Living my best life ✨", likes: "48.2K", color: "#E8B4B8" },
  { user: "@fitgoals24", content: "No pain, no gain 💪", likes: "12.1K", color: "#B4D4E8" },
  { user: "@traveldreams", content: "Bali was a vibe 🌴", likes: "91.4K", color: "#B4E8C4" },
  { user: "@carculture", content: "New drop just landed 🔥", likes: "33.7K", color: "#E8D4B4" },
  { user: "@aestheticvibes", content: "Manifesting this energy", likes: "7.8K", color: "#D4B4E8" },
  { user: "@motivate.daily", content: "Hustle harder. Dream bigger.", likes: "22.3K", color: "#E8E4B4" },
];

interface PhoneScrollProps {
  startFrame?: number;
}

export const PhoneScroll: React.FC<PhoneScrollProps> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const scrollOffset = interpolate(localFrame, [0, 200], [0, -800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phoneOpacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const screenGlow = 0.7 + Math.sin(localFrame * 0.08) * 0.1;

  return (
    <div
      style={{
        opacity: phoneOpacity,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 260,
          height: 520,
          borderRadius: 36,
          border: "3px solid #333",
          background: "#0A0A0A",
          overflow: "hidden",
          position: "relative",
          boxShadow: `0 0 40px rgba(74, 158, 255, ${screenGlow * 0.4}), 0 20px 60px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 28,
            background: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            fontSize: 10,
            color: "#888",
            fontFamily: "monospace",
          }}
        >
          <span>9:41</span>
          <span>◉ ◉ ◉</span>
        </div>
        {/* Feed */}
        <div
          style={{
            transform: `translateY(${scrollOffset}px)`,
            transition: "none",
          }}
        >
          {FEED_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "12px 14px",
                borderBottom: "1px solid #1A1A1A",
                background: "#0F0F0F",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${item.color}, #555)`,
                  marginBottom: 8,
                }}
              />
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4, fontFamily: "monospace" }}>
                {item.user}
              </div>
              {/* Image placeholder */}
              <div
                style={{
                  width: "100%",
                  height: 140,
                  background: `linear-gradient(135deg, ${item.color}33, #1A1A1A)`,
                  borderRadius: 8,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                {["✨", "💪", "🌴", "🔥", "🌙", "⚡"][i % 6]}
              </div>
              <div style={{ fontSize: 10, color: "#CCC", fontFamily: "sans-serif", marginBottom: 4 }}>
                {item.content}
              </div>
              <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace" }}>
                ♥ {item.likes} likes
              </div>
            </div>
          ))}
        </div>
        {/* Screen overlay glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 60%, rgba(74,158,255,0.05) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export const NotificationPop: React.FC<{ startFrame: number; text: string; swipeAway?: boolean }> = ({
  startFrame,
  text,
  swipeAway = false,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const slideIn = interpolate(localFrame, [0, 15], [-300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideOut = swipeAway
    ? interpolate(localFrame, [40, 55], [0, 400], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const translateX = localFrame > 40 ? slideOut : slideIn;

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        background: "rgba(30,30,30,0.95)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 14,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        maxWidth: 300,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        ✝
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#FFF", fontFamily: "sans-serif" }}>
          Church
        </div>
        <div style={{ fontSize: 10, color: "#AAA", fontFamily: "sans-serif" }}>{text}</div>
      </div>
    </div>
  );
};
