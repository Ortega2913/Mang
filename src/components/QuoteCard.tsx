import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Props = {
  quote: string;
  accent: string;
  sequenceDuration: number;
  attribution?: string;
};

export const QuoteCard: React.FC<Props> = ({ quote, accent, sequenceDuration, attribution }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 60 } });
  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - 18, sequenceDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const y = interpolate(enter, [0, 1], [34, 0]);
  const markScale = interpolate(enter, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        padding: '0 240px',
        opacity: enter * exitOpacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontSize: 130,
          fontWeight: 900,
          color: accent,
          lineHeight: 0.5,
          transform: `scale(${markScale})`,
        }}
      >
        “
      </div>
      <div
        style={{
          fontSize: 50,
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.4,
          fontFamily: '"Arial",sans-serif',
        }}
      >
        {quote}
      </div>
      {attribution && (
        <div
          style={{
            fontSize: 18,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: accent,
            fontFamily: '"Arial",sans-serif',
          }}
        >
          {attribution}
        </div>
      )}
    </AbsoluteFill>
  );
};
