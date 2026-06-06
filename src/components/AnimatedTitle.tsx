import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Props = {
  title: string;
  subtitle: string;
  sequenceDuration: number;
};

export const AnimatedTitle: React.FC<Props> = ({
  title,
  subtitle,
  sequenceDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 24, stiffness: 38 } });

  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - 22, sequenceDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const titleY = interpolate(enter, [0, 1], [24, 0]);
  const subtitleY = interpolate(enter, [0, 1], [16, 0]);
  const lineW = interpolate(enter, [0, 1], [0, 140]);
  const cardOpacity = enter * exitOpacity;
  const breathScale = 1 + 0.005 * Math.sin(frame * 0.038);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity: cardOpacity,
      }}
    >
      <div
        style={{
          padding: '30px 52px',
          background: 'rgba(14,10,5,0.58)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          border: '1px solid rgba(201,169,110,0.28)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          transform: `scale(${breathScale})`,
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 300,
            color: '#F5ECD7',
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            transform: `translateY(${titleY}px)`,
            textShadow: '0 2px 18px rgba(0,0,0,0.7)',
          }}
        >
          {title}
        </div>

        <div
          style={{
            width: lineW,
            height: 1,
            background:
              'linear-gradient(to right, transparent, #C9A96E, transparent)',
          }}
        />

        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: '#C9A96E',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
