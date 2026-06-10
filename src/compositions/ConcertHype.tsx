import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { KenBurnsImage } from '../components/KenBurnsImage';
import { StageLights } from '../components/StageLights';
import { ParticleSystem } from '../components/ParticleSystem';
import { CrowdFlashes } from '../components/CrowdFlashes';
import { VignetteOverlay } from '../components/VignetteOverlay';
import { KineticCaption } from '../components/KineticCaption';
import { LiveBadge } from '../components/LiveBadge';

export const CONCERT_HYPE_DURATION = 300; // 10s @ 30fps

const ACCENT = '#FF3B5C';

export const ConcertHype: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Color-graded B-roll push-in */}
      <AbsoluteFill style={{ filter: 'contrast(1.18) saturate(1.45) brightness(1.04)' }}>
        <KenBurnsImage
          src={staticFile('images/concert-photo.jpg')}
          durationInFrames={CONCERT_HYPE_DURATION}
          movement="zoom-in"
        />
      </AbsoluteFill>

      {/* Atmosphere */}
      <StageLights />
      <ParticleSystem hueBase={20} />
      <CrowdFlashes />
      <VignetteOverlay />

      {/* Corner live-broadcast tag */}
      <LiveBadge accent={ACCENT} />

      {/* Persistent lower caption */}
      <KineticCaption
        kicker="On Stage Tonight"
        text="Thousands Of Voices, One Anthem"
        accent={ACCENT}
      />
    </AbsoluteFill>
  );
};
