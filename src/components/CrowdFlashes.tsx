import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

type Flash = {
  id: number;
  x: number;
  y: number;
  size: number;
  period: number;
  offset: number;
};

// Deterministic "phone light / camera flash" sparkles scattered across the
// crowd area — short bright pulses on staggered periods.
const FLASHES: Flash[] = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: (i * 47.3) % 100,
  y: 8 + ((i * 31.7) % 38),
  size: 3 + (i % 4),
  period: 50 + (i % 7) * 11,
  offset: (i * 13) % 50,
}));

export const CrowdFlashes: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {FLASHES.map((f) => {
        const t = (frame + f.offset) % f.period;
        // Sharp pulse: bright for ~4 frames, then off
        const opacity = t < 4 ? 1 - t / 4 : 0;
        if (opacity <= 0) return null;

        return (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: f.size,
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: `0 0 ${f.size * 6}px ${f.size * 2}px rgba(255,255,255,${opacity * 0.8})`,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
