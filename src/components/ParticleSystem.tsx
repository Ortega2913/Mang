import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

type Particle = {
  id: number;
  x: number;
  startY: number;
  size: number;
  speed: number;
  opacity: number;
};

// Deterministic layout via golden angle & prime-step offsets
const PARTICLES: Particle[] = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  startY: (i * 73.191) % 100,
  size: 2 + (i % 5),
  speed: 0.025 + (i % 7) * 0.007,
  opacity: 0.07 + (i % 6) * 0.035,
}));

type Props = {
  hueBase?: number;
};

export const ParticleSystem: React.FC<Props> = ({ hueBase = 185 }) => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: globalOpacity, pointerEvents: 'none' }}>
      {PARTICLES.map((p) => {
        const y = ((p.startY - frame * p.speed * 100) % 110 + 110) % 110 - 10;
        const pulse = 1 + 0.18 * Math.sin(frame * 0.05 + p.id * 1.3);
        const hue = hueBase + (p.id % 4) * 25;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size * pulse,
              height: p.size * pulse,
              borderRadius: '50%',
              backgroundColor: `hsla(${hue}, 100%, 68%, ${p.opacity})`,
              boxShadow: `0 0 ${p.size * 4}px ${p.size * 1.5}px hsla(${hue}, 100%, 68%, ${p.opacity * 0.45})`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
