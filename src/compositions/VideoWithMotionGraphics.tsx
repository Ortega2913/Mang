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
import { ScanLine } from '../components/ScanLine';
import { VignetteOverlay } from '../components/VignetteOverlay';

const TITLE_DURATION = 90;        // 3 s
const LOWER_THIRD_START = 55;     // ~1.8 s
const LOWER_THIRD_DURATION = 180; // 6 s
const OUTRO_DURATION = 90;        // 3 s

export const VideoWithMotionGraphics: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const outroStart = Math.max(0, durationInFrames - OUTRO_DURATION);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000008' }}>
      {/* ── Base video ── */}
      <OffthreadVideo src={staticFile('video.mp4')} />

      {/* ── Always-on layers ── */}
      <VignetteOverlay />
      <ParticleSystem />
      <ScanLine />
      <CornerBrackets />

      {/* ── Intro title card: 0 → 3 s ── */}
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <AnimatedTitle
          title="GROK"
          subtitle="The Future of AI"
          sequenceDuration={TITLE_DURATION}
        />
      </Sequence>

      {/* ── Lower third: ~1.8 s → 7.8 s ── */}
      <Sequence from={LOWER_THIRD_START} durationInFrames={LOWER_THIRD_DURATION}>
        <LowerThird
          primary="Powered by xAI"
          secondary="Next-Generation Intelligence"
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
