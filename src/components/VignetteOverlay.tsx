import React from 'react';
import { AbsoluteFill } from 'remotion';

export const VignetteOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background:
        'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,8,0.72) 100%)',
    }}
  />
);
