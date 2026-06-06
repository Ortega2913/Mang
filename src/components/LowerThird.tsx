import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Props = {
  primary: string;
  secondary: string;
  sequenceDuration: number;
};

export const LowerThird: React.FC<Props> = ({
  primary,
  secondary,
  sequenceDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 22, stiffness: 55 } });
  const translateY = interpolate(enter, [0, 1], [36, 0]);

  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - 22, sequenceDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          transform: `translateY(${translateY}px)`,
          opacity: enter * exitOpacity,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-10px -18px',
            background: 'rgba(14,10,5,0.62)',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
            border: '1px solid rgba(201,169,110,0.22)',
            borderLeft: '3px solid #C9A96E',
          }}
        />

        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#F5ECD7',
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '0.05em',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            position: 'relative',
          }}
        >
          {primary}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: '#C9A96E',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            position: 'relative',
          }}
        >
          {secondary}
        </div>
      </div>
    </AbsoluteFill>
  );
};
