import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { CornerBrackets } from '../components/CornerBrackets';
import { LowerThird } from '../components/LowerThird';
import { Outro } from '../components/Outro';
import { ParticleSystem } from '../components/ParticleSystem';
import { VignetteOverlay } from '../components/VignetteOverlay';
import { ScanLine } from '../components/ScanLine';

const TITLE_DURATION = 90;        // 3 s
const LOWER_THIRD_START = 60;     // 2 s
const LOWER_THIRD_DURATION = 180; // 6 s
const OUTRO_DURATION = 90;        // 3 s

export const VideoWithMotionGraphics: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const outroStart = Math.max(0, durationInFrames - OUTRO_DURATION);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0703' }}>
      {/* ── Base video ── */}
      <OffthreadVideo
        src={staticFile('video.mp4')}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />

      {/* ── Always-on layers ── */}
      <VignetteOverlay />
      <ParticleSystem />
      <ScanLine />
      <CornerBrackets />

      {/* ── Intro title card: 0 → 3 s ── */}
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <AnimatedTitle
          title="Speed Draw"
          subtitle="Pencil on Paper"
          sequenceDuration={TITLE_DURATION}
        />
      </Sequence>

      {/* ── Lower third: 2 s → 8 s ── */}
      <Sequence from={LOWER_THIRD_START} durationInFrames={LOWER_THIRD_DURATION}>
        <LowerThird
          primary="Original Character"
          secondary="Traditional Art · Time-lapse"
          sequenceDuration={LOWER_THIRD_DURATION}
        />
      </Sequence>

      {/* ── Outro: last 3 s ── */}
      <Sequence from={outroStart} durationInFrames={OUTRO_DURATION}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
