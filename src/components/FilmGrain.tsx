import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const FilmGrain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.1 }}>
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', display: 'block' }}
      >
        <defs>
          <filter id="film-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
              seed={frame % 89}
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </AbsoluteFill>
  );
};
