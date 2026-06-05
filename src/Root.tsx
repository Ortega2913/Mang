import React from 'react';
import { Composition, staticFile } from 'remotion';
import { getVideoMetadata } from '@remotion/media-utils';
import { VideoWithMotionGraphics } from './compositions/VideoWithMotionGraphics';

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
            const { durationInSeconds, width, height, fps } =
              await getVideoMetadata(staticFile('video.mp4'));
            const resolvedFps = fps ?? 30;
            return {
              durationInFrames: Math.ceil(durationInSeconds * resolvedFps),
              fps: resolvedFps,
              width,
              height,
            };
          } catch {
            return { durationInFrames: 900 };
          }
        }}
      />
    </>
  );
};
