import React from 'react';
import { Composition, staticFile } from 'remotion';
import { getVideoMetadata } from '@remotion/media-utils';
import { VideoWithMotionGraphics } from './compositions/VideoWithMotionGraphics';
import { DocumentaryTemplate } from './compositions/DocumentaryTemplate';
import { ConcertHype, CONCERT_HYPE_DURATION } from './compositions/ConcertHype';
import { exampleConfig } from './template/exampleConfig';
import { spiritualWarfareConfig } from './template/spiritualWarfareConfig';
import { darkEmpireConfig } from './template/darkEmpireConfig';
import { neonChroniclesConfig } from './template/neonChroniclesConfig';
import { trueCrimeConfig } from './template/trueCrimeConfig';
import { titanBlueprintConfig } from './template/titanBlueprintConfig';
import { collapseRiseConfig } from './template/collapseRiseConfig';
import { getTemplateDuration, TemplateConfig } from './template/types';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Concert hype clip generated from a single still photo —
          Ken Burns push-in, sweeping stage lights, smoke/embers,
          crowd phone-flashes, and kinetic title/caption. */}
      <Composition
        id="ConcertHype"
        component={ConcertHype}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={CONCERT_HYPE_DURATION}
      />

      <Composition
        id="VideoWithMotionGraphics"
        component={VideoWithMotionGraphics}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        calculateMetadata={async () => {
          try {
            const { durationInSeconds } = await getVideoMetadata(
              staticFile('video.mp4')
            );
            return { durationInFrames: Math.ceil(durationInSeconds * 30) };
          } catch {
            return { durationInFrames: 900 };
          }
        }}
      />

      {/* Reusable documentary-style generator: edit src/template/exampleConfig.ts
          (or pass your own `config`) to produce a new episode for any niche. */}
      <Composition
        id="DocumentaryTemplate"
        component={DocumentaryTemplate}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={getTemplateDuration(exampleConfig)}
        defaultProps={{ config: exampleConfig }}
        calculateMetadata={async ({ props }: { props: { config: TemplateConfig } }) => ({
          durationInFrames: getTemplateDuration(props.config),
        })}
      />

      {/* Spiritual Warfare episode — generated from the documentary template,
          themed "Armor of Light" (gold/violet). See template/spiritualWarfareConfig.ts */}
      <Composition
        id="SpiritualWarfare"
        component={DocumentaryTemplate}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={getTemplateDuration(spiritualWarfareConfig)}
        defaultProps={{ config: spiritualWarfareConfig }}
        calculateMetadata={async ({ props }: { props: { config: TemplateConfig } }) => ({
          durationInFrames: getTemplateDuration(props.config),
        })}
      />
      {/* ── MagnatesMedia-style niche templates ── */}
      <Composition id="DarkEmpire" component={DocumentaryTemplate} fps={30} width={1920} height={1080}
        durationInFrames={getTemplateDuration(darkEmpireConfig)}
        defaultProps={{ config: darkEmpireConfig }}
        calculateMetadata={async ({ props }: { props: { config: TemplateConfig } }) => ({
          durationInFrames: getTemplateDuration(props.config),
        })}
      />
      <Composition id="NeonChronicles" component={DocumentaryTemplate} fps={30} width={1920} height={1080}
        durationInFrames={getTemplateDuration(neonChroniclesConfig)}
        defaultProps={{ config: neonChroniclesConfig }}
        calculateMetadata={async ({ props }: { props: { config: TemplateConfig } }) => ({
          durationInFrames: getTemplateDuration(props.config),
        })}
      />
      <Composition id="TrueCrimeFiles" component={DocumentaryTemplate} fps={30} width={1920} height={1080}
        durationInFrames={getTemplateDuration(trueCrimeConfig)}
        defaultProps={{ config: trueCrimeConfig }}
        calculateMetadata={async ({ props }: { props: { config: TemplateConfig } }) => ({
          durationInFrames: getTemplateDuration(props.config),
        })}
      />
      <Composition id="TitansBlueprint" component={DocumentaryTemplate} fps={30} width={1920} height={1080}
        durationInFrames={getTemplateDuration(titanBlueprintConfig)}
        defaultProps={{ config: titanBlueprintConfig }}
        calculateMetadata={async ({ props }: { props: { config: TemplateConfig } }) => ({
          durationInFrames: getTemplateDuration(props.config),
        })}
      />
      <Composition id="CollapseAndRise" component={DocumentaryTemplate} fps={30} width={1920} height={1080}
        durationInFrames={getTemplateDuration(collapseRiseConfig)}
        defaultProps={{ config: collapseRiseConfig }}
        calculateMetadata={async ({ props }: { props: { config: TemplateConfig } }) => ({
          durationInFrames: getTemplateDuration(props.config),
        })}
      />
    </>
  );
};
