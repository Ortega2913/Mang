import React from 'react';
import { Composition, staticFile } from 'remotion';
import { getVideoMetadata } from '@remotion/media-utils';
import { VideoWithMotionGraphics } from './compositions/VideoWithMotionGraphics';
import { DocumentaryTemplate } from './compositions/DocumentaryTemplate';
import { exampleConfig } from './template/exampleConfig';
import { spiritualWarfareConfig } from './template/spiritualWarfareConfig';
import { getTemplateDuration, TemplateConfig } from './template/types';

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};
