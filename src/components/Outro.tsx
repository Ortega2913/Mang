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
  brand?: string;
  tagline?: string;
  accent?: string;
  accent2?: string;
};

export const Outro: React.FC<Props> = ({
  brand = 'GROK',
  tagline = 'xAI · 2026',
  accent = '#00D4FF',
  accent2 = '#7B5CF6',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const overlayOpacity = interpolate(frame, [0, 35], [0, 0.88], {
    extrapolateRight: 'clamp',
  });

  const textProgress = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 14, stiffness: 58 },
  });

  const textY = interpolate(textProgress, [0, 1], [22, 0]);
  const lineW = interpolate(textProgress, [0, 1], [0, 200]);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* Dark overlay */}
      <AbsoluteFill
        style={{ backgroundColor: `rgba(0,0,8,${overlayOpacity})` }}
      />

      {/* Centered branding */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 18,
          opacity: textProgress,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: '"Arial Black","Arial Bold",sans-serif',
            letterSpacing: '-0.02em',
            textShadow: `0 0 30px ${rgba(accent, 0.9)}, 0 0 70px ${rgba(accent, 0.4)}`,
          }}
        >
          {brand}
        </div>

        <div
          style={{
            width: lineW,
            height: 1,
            background: `linear-gradient(to right, transparent, ${accent} 30%, ${accent2} 70%, transparent)`,
            boxShadow: `0 0 12px ${rgba(accent, 0.7)}`,
          }}
        />

        <div
          style={{
            fontSize: 14,
            color: accent,
            fontFamily: '"Arial",sans-serif',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
