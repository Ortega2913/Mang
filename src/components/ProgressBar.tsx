import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = frame / durationInFrames;
  const widthPct = progress * 100;

  const glowIntensity = 6 + 3 * Math.sin(frame * 0.08);

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity: fadeIn }}>
      {/* Track */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: 'rgba(255,255,255,0.07)',
        }}
      />
      {/* Fill */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: `${widthPct}%`,
          height: 2,
          background: 'linear-gradient(to right, #7B5CF6 0%, #00D4FF 100%)',
          boxShadow: `0 0 ${glowIntensity}px 1px rgba(0,212,255,0.55)`,
        }}
      />
      {/* Leading dot */}
      {widthPct > 0 && widthPct < 100 && (
        <div
          style={{
            position: 'absolute',
            bottom: -2,
            left: `calc(${widthPct}% - 3px)`,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#00D4FF',
            boxShadow: `0 0 8px 3px rgba(0,212,255,0.7)`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
