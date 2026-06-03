import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

const PARTICLES: Particle[] = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  speed: Math.random() * 0.08 + 0.02,
  opacity: Math.random() * 0.6 + 0.1,
  drift: (Math.random() - 0.5) * 0.04,
}));

interface ParticleFieldProps {
  color?: string;
  count?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  color = "#4A9EFF",
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {PARTICLES.map((p) => {
        const y = (p.y + frame * p.speed) % 110 - 5;
        const x = p.x + Math.sin(frame * 0.02 + p.id) * p.drift * 50;
        const twinkle = (Math.sin(frame * 0.05 + p.id * 1.3) + 1) / 2;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: p.opacity * (0.4 + 0.6 * twinkle),
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};

export const ScreenGlow: React.FC<{ intensity?: number; color?: string }> = ({
  intensity = 1,
  color = "#1A3A5C",
}) => {
  const frame = useCurrentFrame();
  const flicker = 0.9 + Math.sin(frame * 0.3) * 0.05 + Math.sin(frame * 0.7) * 0.03;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${color}CC ${Math.round(flicker * 60 * intensity)}%, transparent 80%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

export const SunbeamEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.02) * 3;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: `${20 + i * 18 + sway}%`,
            width: `${8 + i * 2}%`,
            height: "100%",
            background: "linear-gradient(180deg, rgba(255,220,120,0.15) 0%, transparent 70%)",
            transform: `skewX(${-8 + i * 3}deg)`,
          }}
        />
      ))}
    </div>
  );
};
