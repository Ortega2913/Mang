import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Props = {
  number: string;
  title: string;
  accent: string;
  sequenceDuration: number;
};

export const ChapterCard: React.FC<Props> = ({ number, title, accent, sequenceDuration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - 18, sequenceDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const titleY = interpolate(enter, [0, 1], [36, 0]);
  const lineW = interpolate(enter, [0, 1], [0, 280]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'rgba(0,0,8,0.94)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 26,
        opacity: enter * exitOpacity,
      }}
    >
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: '0.6em',
          textTransform: 'uppercase',
          color: accent,
          fontFamily: '"Arial",sans-serif',
        }}
      >
        Chapter {number}
      </div>
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          color: '#ffffff',
          textAlign: 'center',
          maxWidth: 1380,
          lineHeight: 1.08,
          fontFamily: '"Arial Black","Arial Bold",sans-serif',
          letterSpacing: '-0.02em',
          transform: `translateY(${titleY}px)`,
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: lineW,
          height: 2,
          background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 16px ${accent}`,
        }}
      />
    </AbsoluteFill>
  );
};
