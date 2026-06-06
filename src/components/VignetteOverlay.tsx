import React from 'react';
import { AbsoluteFill } from 'remotion';

export const VignetteOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background:
        'radial-gradient(ellipse at center, transparent 30%, rgba(14,10,5,0.68) 100%)',
    }}
  />
);
