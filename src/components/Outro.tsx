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

  const overlayOpacity = interpolate(frame, [0, 38], [0, 0.84], {
    extrapolateRight: 'clamp',
  });

  const textProgress = spring({
    frame: Math.max(0, frame - 24),
    fps,
    config: { damping: 20, stiffness: 42 },
  });

  const textY = interpolate(textProgress, [0, 1], [16, 0]);
  const lineW = interpolate(textProgress, [0, 1], [0, 160]);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill
        style={{ backgroundColor: `rgba(10,7,3,${overlayOpacity})` }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          opacity: textProgress,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: '#C9A96E',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
          }}
        >
          Thank you for watching
        </div>

        <div
          style={{
            width: lineW,
            height: 1,
            background:
              'linear-gradient(to right, transparent, #C9A96E 30%, #E8A0B4 70%, transparent)',
          }}
        />

        <div
          style={{
            fontSize: 13,
            color: '#8B7355',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
          }}
        >
          Like · Share · Follow
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
