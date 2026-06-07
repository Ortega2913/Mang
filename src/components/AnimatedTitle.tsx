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
  title: string;
  subtitle: string;
  sequenceDuration: number;
  accent?: string;
};

export const AnimatedTitle: React.FC<Props> = ({
  title,
  subtitle,
  sequenceDuration,
  accent = '#00D4FF',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 11, stiffness: 55 } });

  // Exit fade in last 18 frames of sequence
  const exitOpacity = interpolate(
    frame,
    [sequenceDuration - 18, sequenceDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const titleY = interpolate(enter, [0, 1], [44, 0]);
  const subtitleY = interpolate(enter, [0, 1], [64, 0]);
  const lineW = interpolate(enter, [0, 1], [0, 220]);
  const opacity = enter * exitOpacity;

  // subtle deterministic glitch (no Math.random — frame-based)
  const glitchX =
    Math.sin(frame * 0.28 + 1.57) > 0.96 ? Math.sin(frame * 53.1) * 5 : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        pointerEvents: 'none',
        opacity,
      }}
    >
      {/* Title with optional glitch shift */}
      <div
        style={{
          position: 'relative',
          transform: `translateY(${titleY}px)`,
        }}
      >
        {/* RGB-split ghost — blue */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            fontSize: 130,
            fontWeight: 900,
            color: 'rgba(0,100,255,0.35)',
            fontFamily: '"Arial Black","Arial Bold",sans-serif',
            letterSpacing: '-0.02em',
            transform: `translate(${-glitchX * 1.2}px, 1px)`,
            userSelect: 'none',
          }}
        >
          {title}
        </div>
        {/* RGB-split ghost — red */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            fontSize: 130,
            fontWeight: 900,
            color: 'rgba(255,30,80,0.3)',
            fontFamily: '"Arial Black","Arial Bold",sans-serif',
            letterSpacing: '-0.02em',
            transform: `translate(${glitchX}px, -1px)`,
            userSelect: 'none',
          }}
        >
          {title}
        </div>
        {/* Primary title */}
        <div
          style={{
            fontSize: 130,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: '"Arial Black","Arial Bold",sans-serif',
            letterSpacing: '-0.02em',
            textShadow: `0 0 40px ${rgba(accent, 0.9)}, 0 0 90px ${rgba(accent, 0.4)}`,
            lineHeight: 1,
          }}
        >
          {title}
        </div>
      </div>

      {/* Divider line */}
      <div
        style={{
          width: lineW,
          height: 1,
          background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 12px ${accent}`,
          transform: `translateY(${subtitleY * 0.6}px)`,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 400,
          color: accent,
          fontFamily: '"Arial",sans-serif',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
