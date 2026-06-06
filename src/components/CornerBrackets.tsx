import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const COLOR = '#C9A96E';
const ARM = 50;
const PAD = 30;

export const CornerBrackets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 38, mass: 1.1 },
  });
  const len = interpolate(progress, [0, 1], [0, ARM]);
  const opacity = interpolate(progress, [0, 1], [0, 0.6]);

  const corners = [
    { x: PAD, y: PAD, dx: 1, dy: 1 },
    { x: width - PAD, y: PAD, dx: -1, dy: 1 },
    { x: PAD, y: height - PAD, dx: 1, dy: -1 },
    { x: width - PAD, y: height - PAD, dx: -1, dy: -1 },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity }}>
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', overflow: 'visible' }}
      >
        {corners.map((c, i) => (
          <g key={i}>
            <line
              x1={c.x}
              y1={c.y}
              x2={c.x + c.dx * len}
              y2={c.y}
              stroke={COLOR}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <line
              x1={c.x}
              y1={c.y}
              x2={c.x}
              y2={c.y + c.dy * len}
              stroke={COLOR}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
