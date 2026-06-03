import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const COLOR = '#00D4FF';
const ARM = 60;
const PAD = 32;

export const CornerBrackets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 65, mass: 0.9 },
  });
  const len = interpolate(progress, [0, 1], [0, ARM]);

  // pulse glow so brackets breathe slightly after drawing in
  const glow = 3 + 2 * Math.sin(frame * 0.06);

  const corners = [
    { x: PAD, y: PAD, dx: 1, dy: 1 },
    { x: width - PAD, y: PAD, dx: -1, dy: 1 },
    { x: PAD, y: height - PAD, dx: 1, dy: -1 },
    { x: width - PAD, y: height - PAD, dx: -1, dy: -1 },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', overflow: 'visible' }}
      >
        <defs>
          <filter id="bracket-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {corners.map((c, i) => (
          <g key={i} filter="url(#bracket-glow)">
            <line
              x1={c.x}
              y1={c.y}
              x2={c.x + c.dx * len}
              y2={c.y}
              stroke={COLOR}
              strokeWidth={3}
              strokeLinecap="square"
            />
            <line
              x1={c.x}
              y1={c.y}
              x2={c.x}
              y2={c.y + c.dy * len}
              stroke={COLOR}
              strokeWidth={3}
              strokeLinecap="square"
            />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
