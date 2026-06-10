import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { rgba } from '../utils/color';

type Props = {
  label?: string;
  accent?: string;
};

export const LiveBadge: React.FC<Props> = ({ label = 'LIVE', accent = '#FF3B5C' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  const x = interpolate(enter, [0, 1], [-40, 0]);

  // Pulsing dot
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(frame * 0.18));

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 70,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 22px',
          borderRadius: 6,
          background: 'rgba(0,0,8,0.45)',
          border: `1px solid ${rgba(accent, 0.4)}`,
          backdropFilter: 'blur(4px)',
          opacity: enter,
          transform: `translateX(${x}px)`,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 ${10 + pulse * 14}px ${4 + pulse * 4}px ${rgba(accent, 0.6 * pulse)}`,
          }}
        />
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '0.3em',
            fontFamily: '"Arial Black","Arial Bold",sans-serif',
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
