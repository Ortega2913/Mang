import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { ChapterCard } from '../components/ChapterCard';
import { CornerBrackets } from '../components/CornerBrackets';
import { KenBurnsImage } from '../components/KenBurnsImage';
import { KineticCaption } from '../components/KineticCaption';
import { LowerThird } from '../components/LowerThird';
import { Outro } from '../components/Outro';
import { ParticleSystem } from '../components/ParticleSystem';
import { QuoteCard } from '../components/QuoteCard';
import { ScanLine } from '../components/ScanLine';
import { StatCallout } from '../components/StatCallout';
import { VignetteOverlay } from '../components/VignetteOverlay';
import { SceneConfig, TemplateConfig } from '../template/types';
import { hexToHue } from '../utils/color';

type Props = {
  config: TemplateConfig;
};

const renderScene = (scene: SceneConfig, accent: string) => {
  switch (scene.type) {
    case 'chapter':
      return (
        <ChapterCard
          number={scene.number}
          title={scene.title}
          accent={accent}
          sequenceDuration={scene.durationInFrames}
        />
      );
    case 'image':
      return (
        <>
          <KenBurnsImage
            src={scene.src}
            movement={scene.movement}
            durationInFrames={scene.durationInFrames}
          />
          {(scene.kicker || scene.caption) && (
            <KineticCaption kicker={scene.kicker} text={scene.caption} accent={accent} />
          )}
        </>
      );
    case 'stat':
      return (
        <StatCallout
          value={scene.value}
          label={scene.label}
          prefix={scene.prefix}
          suffix={scene.suffix}
          accent={accent}
          sequenceDuration={scene.durationInFrames}
        />
      );
    case 'quote':
      return (
        <QuoteCard
          quote={scene.quote}
          attribution={scene.attribution}
          accent={accent}
          sequenceDuration={scene.durationInFrames}
        />
      );
    default:
      return null;
  }
};

export const DocumentaryTemplate: React.FC<Props> = ({ config }) => {
  const { theme, intro, lowerThird, scenes, outro } = config;

  let cursor = intro.durationInFrames;
  const placedScenes = scenes.map((scene) => {
    const from = cursor;
    cursor += scene.durationInFrames;
    return { scene, from };
  });
  const outroStart = cursor;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      {/* ── Always-on signature layers, tinted to the episode theme ── */}
      <VignetteOverlay />
      <ParticleSystem hueBase={hexToHue(theme.accent)} />
      <ScanLine color={theme.accent} />
      <CornerBrackets color={theme.accent} />

      {/* ── Title card ── */}
      <Sequence from={0} durationInFrames={intro.durationInFrames}>
        <AnimatedTitle
          title={intro.title}
          subtitle={intro.subtitle}
          accent={theme.accent}
          sequenceDuration={intro.durationInFrames}
        />
      </Sequence>

      {/* ── Optional channel/series lower third over the opening scenes ── */}
      {lowerThird && (
        <Sequence
          from={intro.durationInFrames + lowerThird.startFrame}
          durationInFrames={lowerThird.durationInFrames}
        >
          <LowerThird
            primary={lowerThird.primary}
            secondary={lowerThird.secondary}
            accent={theme.accent}
            accent2={theme.accent2}
            sequenceDuration={lowerThird.durationInFrames}
          />
        </Sequence>
      )}

      {/* ── Story beats: chapters, B-roll images, stats, quotes ── */}
      {placedScenes.map(({ scene, from }, i) => (
        <Sequence key={i} from={from} durationInFrames={scene.durationInFrames}>
          {renderScene(scene, theme.accent)}
        </Sequence>
      ))}

      {/* ── Branded outro ── */}
      <Sequence from={outroStart} durationInFrames={outro.durationInFrames}>
        <Outro
          brand={outro.brand}
          tagline={outro.tagline}
          accent={theme.accent}
          accent2={theme.accent2}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
