import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const Outro: React.FC = () => {
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
            textShadow:
              '0 0 30px rgba(0,212,255,0.9), 0 0 70px rgba(0,212,255,0.4)',
          }}
        >
          GROK
        </div>

        <div
          style={{
            width: lineW,
            height: 1,
            background:
              'linear-gradient(to right, transparent, #00D4FF 30%, #7B5CF6 70%, transparent)',
            boxShadow: '0 0 12px rgba(0,212,255,0.7)',
          }}
        />

        <div
          style={{
            fontSize: 14,
            color: '#00D4FF',
            fontFamily: '"Arial",sans-serif',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
          }}
        >
          xAI · 2026
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
