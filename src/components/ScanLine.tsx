import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

// Soft ambient highlight — like studio light brushing across the paper
const PERIOD = 480;
const DURATION = 180;

export const ScanLine: React.FC = () => {
  const frame = useCurrentFrame();
  const phase = frame % PERIOD;

  if (phase >= DURATION) return null;

  const t = phase / DURATION;
  const y = interpolate(t, [0, 1], [-8, 108]);
  const opacity = interpolate(t, [0, 0.1, 0.5, 0.9, 1], [0, 0.14, 0.09, 0.14, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: `${y}%`,
          left: 0,
          right: 0,
          height: 100,
          background:
            'linear-gradient(to bottom, transparent, rgba(255,248,235,0.25) 50%, transparent)',
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};
