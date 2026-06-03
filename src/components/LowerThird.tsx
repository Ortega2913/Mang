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

  const enter = spring({ frame, fps, config: { damping: 17, stiffness: 80 } });
  const translateX = interpolate(enter, [0, 1], [-340, 0]);
  const lineW = interpolate(enter, [0, 1], [0, 180]);

  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - 18, sequenceDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 70,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          transform: `translateX(${translateX}px)`,
          opacity: enter * exitOpacity,
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: 5,
            height: 72,
            borderRadius: 3,
            background: 'linear-gradient(to bottom, #00D4FF, #7B5CF6)',
            boxShadow: '0 0 14px 4px rgba(0,212,255,0.55)',
          }}
        />

        {/* Text block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {/* Background pill */}
          <div
            style={{
              position: 'absolute',
              inset: '-8px -14px',
              background: 'rgba(0,0,8,0.55)',
              backdropFilter: 'blur(6px)',
              borderRadius: 6,
              border: '1px solid rgba(0,212,255,0.15)',
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: '"Arial",sans-serif',
              letterSpacing: '0.04em',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              position: 'relative',
            }}
          >
            {primary}
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 400,
              color: '#00D4FF',
              fontFamily: '"Arial",sans-serif',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              position: 'relative',
            }}
          >
            {secondary}
          </div>
        </div>

        {/* Trailing line */}
        <div
          style={{
            width: lineW,
            height: 1,
            background:
              'linear-gradient(to right, rgba(0,212,255,0.6), transparent)',
            alignSelf: 'center',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
