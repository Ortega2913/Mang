import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

type Particle = {
  id: number;
  x: number;
  startY: number;
  size: number;
  speed: number;
  opacity: number;
  warm: number;
};

const PARTICLES: Particle[] = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  startY: (i * 83.19) % 100,
  size: 0.8 + (i % 4) * 0.55,
  speed: 0.006 + (i % 6) * 0.003,
  opacity: 0.035 + (i % 5) * 0.018,
  warm: (i % 3) / 3,
}));

export const ParticleSystem: React.FC = () => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: globalOpacity, pointerEvents: 'none' }}>
      {PARTICLES.map((p) => {
        const y = ((p.startY - frame * p.speed * 100) % 110 + 110) % 110 - 10;
        const drift = Math.sin(frame * 0.018 + p.id * 0.9) * 0.4;
        const r = Math.round(160 + p.warm * 30);
        const g = Math.round(130 + p.warm * 20);
        const b = Math.round(90 + p.warm * 10);

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x + drift}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: `rgba(${r},${g},${b},${p.opacity})`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
