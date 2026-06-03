import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { SunbeamEffect } from "../components/ParticleField";
import { DialogueLine } from "../components/AnimatedText";

const FloatingDust: React.FC = () => {
  const frame = useCurrentFrame();
  const motes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i * 37 + 10) % 100,
    y: (i * 23 + 20) % 100,
    size: Math.random() * 4 + 1,
    speed: 0.015 + (i % 5) * 0.005,
    drift: Math.sin(i * 1.7) * 0.02,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {motes.map((m) => {
        const y = (m.y - frame * m.speed + 100) % 105;
        const x = m.x + Math.sin(frame * 0.01 + m.id) * 2;
        return (
          <div
            key={m.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: m.size,
              height: m.size,
              borderRadius: "50%",
              background: "rgba(255,220,150,0.7)",
              opacity: 0.4 + Math.sin(frame * 0.03 + m.id) * 0.2,
            }}
          />
        );
      })}
    </div>
  );
};

const LaceCurtain: React.FC<{ side: "left" | "right" }> = ({ side }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.015) * 3;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        [side]: 0,
        width: "18%",
        height: "100%",
        background: `linear-gradient(${side === "left" ? "90deg" : "270deg"}, rgba(255,248,230,0.15), transparent)`,
        transform: `skewX(${sway}deg)`,
        transformOrigin: side === "left" ? "left top" : "right top",
      }}
    >
      {/* Lace pattern strips */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${i * 13}%`,
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,240,200,0.2)",
          }}
        />
      ))}
    </div>
  );
};

const PlantDecor: React.FC = () => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.02) * 2;
  return (
    <div
      style={{
        position: "absolute",
        right: "22%",
        bottom: "20%",
        transform: `rotate(${sway}deg)`,
        transformOrigin: "bottom center",
        fontSize: 70,
        filter: "drop-shadow(0 10px 20px rgba(0,80,20,0.3))",
      }}
    >
      🌿
    </div>
  );
};

const DIALOGUES = [
  { character: "GRANDMA ROSE", text: "You look like you haven't slept in days. Or prayed in years.", start: 20, color: "#F4A261" },
  { character: "ALEX", text: "Why do you still believe, Grandma? After everything? The world is burning. Why do we need God?", start: 100, color: "#4A9EFF" },
  { character: "GRANDMA ROSE", text: "Science tells us how the stars burn. It doesn't tell us why they're beautiful.", start: 180, color: "#F4A261" },
  { character: "ALEX", text: "We have meaning. Career. Money. Experiences. Freedom.", start: 270, color: "#4A9EFF" },
  { character: "GRANDMA ROSE", text: "Freedom to do what? Scroll? Compare? Chase validation from strangers? You are connected to everyone, yet lonelier than we ever were.", start: 330, color: "#F4A261" },
  { character: "ALEX", text: "Maybe I am... terrified of silence.", start: 440, color: "#4A9EFF" },
  { character: "GRANDMA ROSE", text: "The world sells you pleasure, Alex. God offers peace. Pleasure lasts minutes. Peace lasts through storms.", start: 490, color: "#F4A261" },
  { character: "ALEX", text: "Soul? That's outdated.", start: 590, color: "#4A9EFF" },
  { character: "GRANDMA ROSE", text: "Then why do you feel empty after ten reels? Why do your friends talk about anxiety but never touch grass?", start: 640, color: "#F4A261" },
  { character: "GRANDMA ROSE", text: "This generation replaced the fear of God with the fear of missing out. Likes are your prayers. Cancel culture is your judgment day.", start: 730, color: "#F4A261" },
  { character: "ALEX", text: "But religion has caused so much pain. Wars. Hypocrisy. Control.", start: 830, color: "#4A9EFF" },
  { character: "GRANDMA ROSE", text: "People have caused pain. God has caused love. Don't confuse the two.", start: 890, color: "#F4A261" },
];

export const Scene2Grandma: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [980, 1000], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const alexEnter = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 120, stiffness: 60 }, from: 60, to: 0 });

  const currentDialogue = DIALOGUES.filter((d) => frame >= d.start).slice(-1)[0];

  const warmth = interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1A1208",
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Warm room background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 150% 100% at 60% 30%, rgba(180,120,40,${0.18 * warmth}) 0%, rgba(100,60,10,${0.12 * warmth}) 40%, #0D0A05 100%)`,
        }}
      />

      {/* Floor */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(180deg, #1A1005 0%, #120B03 100%)",
          borderTop: "2px solid #2A1A08",
        }}
      />

      {/* Sunbeams from window */}
      <SunbeamEffect />

      {/* Floating dust motes */}
      <FloatingDust />

      {/* Lace curtains */}
      <LaceCurtain side="left" />
      <LaceCurtain side="right" />

      {/* Plant decoration */}
      <PlantDecor />

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
          color: "#F4A261",
          textTransform: "uppercase",
          zIndex: 20,
        }}
      >
        INT. Grandma Rose's House · Next Day
      </div>

      {/* Grandma Rose figure */}
      <div
        style={{
          position: "absolute",
          right: "28%",
          bottom: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4956A, #9B6B45)",
            border: "3px solid #F4A261",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          🌸
        </div>
        <div
          style={{
            width: 75,
            height: 95,
            background: "#2A1508",
            borderRadius: "8px 8px 0 0",
            border: "2px solid #3A2010",
          }}
        />
        <div style={{ fontSize: 9, color: "#F4A261", fontFamily: "monospace", letterSpacing: 2, marginTop: 4 }}>
          GRANDMA ROSE
        </div>
      </div>

      {/* Alex figure (tired, slouched) */}
      <div
        style={{
          position: "absolute",
          left: "28%",
          bottom: `calc(20% + ${alexEnter}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#1A2A3A",
            border: "2px solid #2A4A6A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          😔
        </div>
        <div
          style={{
            width: 65,
            height: 85,
            background: "#111A24",
            borderRadius: "8px 8px 0 0",
            border: "2px solid #1A2A3A",
            transform: "rotate(-3deg)",
          }}
        />
        <div style={{ fontSize: 10, color: "#4A9EFF", fontFamily: "monospace", letterSpacing: 2, marginTop: 4 }}>
          ALEX
        </div>
      </div>

      {/* Old Bible visual */}
      {frame >= 860 && (
        <div
          style={{
            position: "absolute",
            right: "18%",
            bottom: "24%",
            opacity: interpolate(frame, [860, 890], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            fontSize: 32,
            filter: "drop-shadow(0 4px 12px rgba(200,150,50,0.4))",
            transform: `rotate(${Math.sin(frame * 0.02) * 2}deg)`,
          }}
        >
          📖
        </div>
      )}

      {/* Incense smoke */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "24%",
            left: `${15 + i * 3}%`,
            width: 2,
            height: `${30 + Math.sin(frame * 0.04 + i) * 10}%`,
            background: "linear-gradient(180deg, transparent, rgba(200,160,80,0.15), rgba(200,160,80,0.08))",
            borderRadius: 2,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Dialogue */}
      <div
        style={{
          position: "absolute",
          bottom: "4%",
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

      {/* Window light frame */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "5%",
          width: 120,
          height: 160,
          border: "3px solid rgba(255,220,100,0.2)",
          background: `rgba(255,220,100,${0.04 * warmth})`,
          boxShadow: `inset 0 0 30px rgba(255,220,100,${0.1 * warmth})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(255,220,100,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 3,
            background: "rgba(255,220,100,0.2)",
          }}
        />
      </div>
    </div>
  );
};
