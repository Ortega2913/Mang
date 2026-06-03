import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const PERIOD = 330;   // frames between sweeps
const DURATION = 110; // frames per sweep

export const ScanLine: React.FC = () => {
  const frame = useCurrentFrame();
  const phase = frame % PERIOD;

  if (phase >= DURATION) return null;

  const t = phase / DURATION;
  const y = interpolate(t, [0, 1], [-1, 101]);
  const opacity = interpolate(t, [0, 0.08, 0.92, 1], [0, 0.55, 0.55, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: `${y}%`,
          left: 0,
          right: 0,
          height: 3,
          background:
            'linear-gradient(to right, transparent 0%, rgba(0,212,255,0.85) 15%, rgba(0,212,255,0.85) 85%, transparent 100%)',
          boxShadow: '0 0 24px 6px rgba(0,212,255,0.35)',
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};
