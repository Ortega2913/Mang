import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { DialogueLine } from "../components/AnimatedText";

const LampGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const flicker = 0.85 + Math.sin(frame * 0.07) * 0.08 + Math.sin(frame * 0.13) * 0.04;
  return (
    <>
      {/* Lamp */}
      <div
        style={{
          position: "absolute",
          right: "20%",
          bottom: "30%",
          width: 50,
          height: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Shade */}
        <div
          style={{
            width: 50,
            height: 40,
            background: `rgba(255,200,100,${0.15 * flicker})`,
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            border: "2px solid rgba(255,200,100,0.3)",
          }}
        />
        {/* Stem */}
        <div style={{ width: 4, height: 40, background: "#333" }} />
      </div>
      {/* Warm glow pool */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          bottom: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,180,60,${0.12 * flicker}) 0%, transparent 70%)`,
          transform: "translate(50%, 50%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

const PrayingHands: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  if (local < 0) return null;

  const fold = spring({ frame: local, fps, config: { damping: 80, stiffness: 60 }, from: 0, to: 1 });
  const glow = interpolate(local, [0, 30, 100], [0, 0.8, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "35%",
        left: "50%",
        transform: `translateX(-50%) scale(${fold})`,
        fontSize: 60,
        filter: `drop-shadow(0 0 ${20 * glow}px rgba(255,220,100,${glow}))`,
        opacity: fold,
      }}
    >
      🙏
    </div>
  );
};

const BibleReveal: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  if (local < 0) return null;

  const rise = spring({ frame: local, fps, config: { damping: 100, stiffness: 70 }, from: 40, to: 0 });
  const opacity = interpolate(local, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowPulse = 0.5 + Math.sin(frame * 0.08) * 0.2;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "35%",
        left: "30%",
        opacity,
        transform: `translateY(${rise}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 70,
          filter: `drop-shadow(0 0 ${15 * glowPulse}px rgba(255,200,80,${glowPulse}))`,
        }}
      >
        📖
      </div>
      {/* Photo falling out */}
      {local > 30 && (
        <div
          style={{
            opacity: interpolate(local, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `rotate(${-15 + Math.sin(frame * 0.03) * 3}deg) translateY(${interpolate(local, [30, 50], [-10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            background: "rgba(255,240,200,0.9)",
            width: 60,
            height: 45,
            borderRadius: 3,
            border: "2px solid rgba(200,150,50,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          👦🤲
        </div>
      )}
    </div>
  );
};

const TextMessage: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  if (local < 0) return null;

  const slideIn = interpolate(local, [0, 20], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(local, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: "15%",
        right: "10%",
        transform: `translateX(${slideIn}px)`,
        opacity,
        background: "rgba(20,20,20,0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "12px 18px",
        maxWidth: 250,
        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ fontSize: 11, color: "#FF6B9D", fontFamily: "sans-serif", fontWeight: 700, marginBottom: 4 }}>
        📱 MIRA
      </div>
      <div style={{ fontSize: 14, color: "#DDD", fontFamily: "sans-serif" }}>
        Yo, you still coming? 🥂
      </div>
    </div>
  );
};

const PhoneFaceDown: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  if (local < 0) return null;

  const flip = spring({ frame: local, fps, config: { damping: 90, stiffness: 80 }, from: 0, to: 1 });

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        right: "12%",
        transform: `rotateX(${flip * 180}deg)`,
        transformStyle: "preserve-3d",
        width: 60,
        height: 110,
        borderRadius: 10,
        background: "#1A1A1A",
        border: "2px solid #333",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        opacity: interpolate(local, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}
    />
  );
};

const GOD_VOICE_LINES = [
  { text: "I never left.", start: 50 },
  { text: "You just stopped listening.", start: 80 },
  { text: "You traded awe for entertainment. Wonder for convenience.", start: 120 },
  { text: "I am still here. In the quiet. In the questions you're afraid to ask.", start: 190 },
  { text: "In the love you're scared to give.", start: 270 },
];

const ALEX_LINES = [
  { text: "If You're there... why does it feel like You're not?", start: 10, color: "#4A9EFF" },
  { text: "I don't know how to come back.", start: 320, color: "#4A9EFF" },
];

const GOD_RESPONSE = [
  { text: "One honest prayer is louder than a thousand scrolls. Start there.", start: 360 },
];

const DIALOGUES_ALL = [
  ...ALEX_LINES.map((d) => ({ ...d, character: "ALEX", isGod: false })),
  ...GOD_VOICE_LINES.map((d) => ({ ...d, character: "VOICE OF GOD", color: "#FFE566", isGod: true })),
  ...GOD_RESPONSE.map((d) => ({ ...d, character: "VOICE OF GOD", color: "#FFE566", isGod: true })),
];

export const Scene3Redemption: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [500, 520], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const darkness = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const divineLight = interpolate(frame, [40, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const divinePulse = divineLight * (0.6 + Math.sin(frame * 0.04) * 0.2);

  const currentDialogue = DIALOGUES_ALL.filter((d) => frame >= d.start).slice(-1)[0];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#050505",
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Very dark room */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, #0D0D0D 0%, #000000 100%)`,
          opacity: darkness,
        }}
      />

      {/* Scene label */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          opacity: interpolate(frame, [0, 20, 60, 80], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          fontFamily: "'Georgia', serif",
          fontSize: 14,
          letterSpacing: 4,
          color: "#666",
          textTransform: "uppercase",
          zIndex: 20,
        }}
      >
        INT. Alex's Apartment · Late Night
      </div>

      {/* Lamp glow (only light source) */}
      <LampGlow />

      {/* Divine light when God speaks */}
      {frame >= 40 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255,240,180,${divinePulse * 0.08}) 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* God voice visual — emanating light beams */}
      {frame >= 40 && (
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 2,
                height: `${150 + i * 30}px`,
                background: `linear-gradient(180deg, rgba(255,240,150,${divinePulse * 0.4}) 0%, transparent 100%)`,
                transform: `rotate(${(i - 3.5) * 15}deg)`,
                transformOrigin: "top center",
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      )}

      {/* Text message notification */}
      <TextMessage startFrame={420} />

      {/* Phone face down */}
      {frame >= 450 && <PhoneFaceDown startFrame={450} />}

      {/* Bible reveal */}
      <BibleReveal startFrame={300} />

      {/* Praying hands */}
      <PrayingHands startFrame={440} />

      {/* Alex silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#0D1520",
            border: "2px solid #1A2A3A",
            boxShadow: `0 0 ${20 * (1 - Math.min(frame / 100, 1))}px rgba(74,158,255,0.3)`,
          }}
        />
        <div
          style={{
            width: 70,
            height: 90,
            background: "#0A0E14",
            borderRadius: "8px 8px 0 0",
            border: "2px solid #111A24",
          }}
        />
      </div>

      {/* "Not tonight" text */}
      {frame >= 470 && frame <= 510 && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [470, 490, 500, 510], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontSize: 32,
            color: "#F0EDE8",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            textAlign: "center",
            fontWeight: 300,
          }}
        >
          "Not tonight."
        </div>
      )}

      {/* Dialogue */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 30,
        }}
      >
        {currentDialogue && (
          <DialogueLine
            key={currentDialogue.start}
            character={currentDialogue.character}
            text={currentDialogue.text}
            startFrame={currentDialogue.start}
            characterColor={currentDialogue.color}
          />
        )}
      </div>

      {/* God voice ambient pulse rings */}
      {frame >= 40 && frame <= 310 && (
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
          {[0, 1, 2].map((i) => {
            const pulse = ((frame - 40 + i * 30) % 90) / 90;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  width: pulse * 200,
                  height: pulse * 200,
                  borderRadius: "50%",
                  border: `1px solid rgba(255,240,150,${(1 - pulse) * 0.3})`,
                  transform: `translate(-50%, ${-pulse * 100}px)`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
