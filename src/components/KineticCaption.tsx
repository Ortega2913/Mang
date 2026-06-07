import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { rgba } from '../utils/color';

type Props = {
  kicker?: string;
  text?: string;
  accent: string;
};

export const KineticCaption: React.FC<Props> = ({ kicker, text, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kickerEnter = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const kickerY = interpolate(kickerEnter, [0, 1], [18, 0]);

  const words = (text ?? '').split(' ').filter(Boolean);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        padding: '0 110px 140px',
        background: `linear-gradient(to top, ${rgba('#000008', 0.78)} 0%, transparent 55%)`,
      }}
    >
      {kicker && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 16,
            opacity: kickerEnter,
            transform: `translateY(${kickerY}px)`,
          }}
        >
          <div style={{ width: 34, height: 2, background: accent, boxShadow: `0 0 10px ${accent}` }} />
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: accent,
              fontFamily: '"Arial",sans-serif',
            }}
          >
            {kicker}
          </div>
        </div>
      )}

      {words.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 1280 }}>
          {words.map((word, i) => {
            const delay = i * 2.5;
            const enter = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 130 } });
            const wordY = interpolate(enter, [0, 1], [28, 0]);

            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  marginRight: 16,
                  marginBottom: 4,
                  opacity: enter,
                  transform: `translateY(${wordY}px)`,
                  fontSize: 44,
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: '"Arial Black","Arial Bold",sans-serif',
                  textShadow: '0 6px 28px rgba(0,0,0,0.7)',
                  lineHeight: 1.2,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
