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
  value: number;
  label: string;
  accent: string;
  sequenceDuration: number;
  prefix?: string;
  suffix?: string;
};

export const StatCallout: React.FC<Props> = ({
  value,
  label,
  accent,
  sequenceDuration,
  prefix = '',
  suffix = '',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 55 } });
  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - 18, sequenceDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const count = interpolate(enter, [0, 1], [0, value], { extrapolateRight: 'clamp' });
  const display = Math.round(count).toLocaleString('en-US');
  const labelY = interpolate(enter, [0, 1], [22, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        opacity: enter * exitOpacity,
      }}
    >
      <div
        style={{
          fontSize: 132,
          fontWeight: 900,
          color: '#ffffff',
          fontFamily: '"Arial Black","Arial Bold",sans-serif',
          letterSpacing: '-0.02em',
          textShadow: `0 0 50px ${accent}, 0 0 110px ${rgba(accent, 0.4)}`,
        }}
      >
        {prefix}
        <span style={{ color: accent }}>{display}</span>
        {suffix}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: '#ffffff',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: 900,
          fontFamily: '"Arial",sans-serif',
          opacity: 0.85,
          transform: `translateY(${labelY}px)`,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};
