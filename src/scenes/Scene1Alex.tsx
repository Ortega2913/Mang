import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { ParticleField, ScreenGlow } from "../components/ParticleField";
import { PhoneScroll, NotificationPop } from "../components/PhoneScroll";
import { DialogueLine } from "../components/AnimatedText";

const SceneLabel: React.FC<{ label: string; startFrame: number }> = ({ label, startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const opacity = interpolate(local, [0, 20, 60, 80], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 60,
        opacity,
        fontFamily: "'Georgia', serif",
        fontSize: 14,
        letterSpacing: 4,
        color: "#4A9EFF",
        textTransform: "uppercase",
        zIndex: 20,
      }}
    >
      {label}
    </div>
  );
};

const EnergyDrinkCans: React.FC = () => {
  const frame = useCurrentFrame();
  const cans = [
    { x: 10, y: 75, rot: -15 },
    { x: 18, y: 80, rot: 8 },
    { x: 6, y: 85, rot: -5 },
    { x: 25, y: 78, rot: 20 },
    { x: 82, y: 77, rot: -10 },
    { x: 88, y: 82, rot: 15 },
  ];
  return (
    <>
      {cans.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: 20,
            height: 40,
            borderRadius: "4px 4px 3px 3px",
            background: "linear-gradient(180deg, #1A3A5C 0%, #0D2035 50%, #0A1825 100%)",
            border: "1px solid #2A5A8C",
            transform: `rotate(${c.rot}deg)`,
            opacity: interpolate(frame, [0, 30], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ height: 8, background: "#2A7AFF", borderRadius: "3px 3px 0 0", opacity: 0.6 }} />
        </div>
      ))}
    </>
  );
};

const DIALOGUES = [
  { character: "ALEX", text: "Why would anyone believe in something they can't see, touch, or Google?", start: 30, color: "#4A9EFF" },
  { character: "ALEX", text: "This is what heaven looks like now.", start: 120, color: "#4A9EFF" },
  { character: "MIRA", text: "Bro, you coming to the party or what? Everyone's going. Free drinks, good vibes.", start: 200, color: "#FF6B9D" },
  { character: "ALEX", text: "I don't know, Mira. I've been thinking lately...", start: 290, color: "#4A9EFF" },
  { character: "MIRA", text: "Thinking is overrated. Remember when we used to pray before exams? Cute, right? Now we watch motivational reels at 2x speed.", start: 360, color: "#FF6B9D" },
  { character: "ALEX", text: "You never feel... empty? Like something's missing?", start: 460, color: "#4A9EFF" },
  { character: "MIRA", text: "I feel empty for 3 seconds, then I post a story and someone likes it. Problem solved. God doesn't give instant dopamine, Alex. Social media does.", start: 520, color: "#FF6B9D" },
  { character: "ALEX", text: "My parents forced me to church every Sunday. But when I saw pastors on Instagram living in mansions while asking for tithes... something broke.", start: 620, color: "#4A9EFF" },
  { character: "MIRA", text: "Exactly. Religion feels like a business now. God should fire his PR team.", start: 710, color: "#FF6B9D" },
];

export const Scene1Alex: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [790, 810], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const milesEnter = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 100, stiffness: 60 }, from: -200, to: 0 });

  const currentDialogue = DIALOGUES.filter((d) => frame >= d.start).slice(-1)[0];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#030810",
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Deep night blue atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 120% 80% at 50% 60%, #0A1A2F 0%, #030810 100%)",
        }}
      />

      {/* Particle stars */}
      <ParticleField color="#2A5A8C" />

      {/* Screen glow */}
      <ScreenGlow intensity={1.2} color="#1A3A6C" />

      {/* Scene label */}
      <SceneLabel label="INT. Alex's Apartment · Night" startFrame={0} />

      {/* Alex figure (stylized silhouette) */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Head */}
        <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#1A2A3A", border: "2px solid #2A4A6A" }} />
        {/* Body */}
        <div style={{ width: 70, height: 90, background: "#111A24", borderRadius: "8px 8px 0 0", border: "2px solid #1A2A3A" }}>
          {/* Phone glow on body */}
          <div
            style={{
              margin: "10px auto",
              width: 40,
              height: 60,
              background: `rgba(74,158,255,${0.1 + Math.sin(frame * 0.05) * 0.05})`,
              borderRadius: 4,
              boxShadow: `0 0 20px rgba(74,158,255,0.3)`,
            }}
          />
        </div>
      </div>

      {/* Energy drink cans */}
      <EnergyDrinkCans />

      {/* Phone scroll (right side) */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "50%",
          transform: "translateY(-50%) scale(0.85)",
        }}
      >
        <PhoneScroll startFrame={10} />
      </div>

      {/* Church notification */}
      <div
        style={{
          position: "absolute",
          top: 120,
          right: "12%",
          zIndex: 20,
        }}
      >
        {frame >= 540 && frame <= 620 && (
          <NotificationPop startFrame={540} text="Youth Prayer Night — Join us tonight!" swipeAway={true} />
        )}
      </div>

      {/* Mira character entrance */}
      {frame >= 180 && (
        <div
          style={{
            position: "absolute",
            left: "12%",
            bottom: "15%",
            transform: `translateX(${milesEnter - 200}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Head */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6B9D, #C44569)",
              border: "2px solid #FF6B9D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            📱
          </div>
          {/* Body */}
          <div
            style={{
              width: 65,
              height: 85,
              background: "#2A0D1A",
              borderRadius: "8px 8px 0 0",
              border: "2px solid #3D1525",
            }}
          />
          <div style={{ fontSize: 10, color: "#FF6B9D", fontFamily: "monospace", letterSpacing: 2, marginTop: 4 }}>
            MIRA
          </div>
        </div>
      )}

      {/* "hollow laughter" visual cue */}
      {frame >= 745 && frame <= 800 && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [745, 760, 790, 800], [0, 0.6, 0.6, 0]),
            fontSize: 40,
            letterSpacing: 8,
            color: "rgba(255,255,255,0.3)",
            fontStyle: "italic",
            fontFamily: "'Georgia', serif",
          }}
        >
          — hollow laughter —
        </div>
      )}

      {/* Dialogue display */}
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

      {/* Blue screen ambiance strips */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, rgba(74,158,255,${0.3 + Math.sin(frame * 0.1) * 0.1}), transparent)`,
        }}
      />
    </div>
  );
};
