import React from 'react';
import { Composition, staticFile } from 'remotion';
import { getVideoMetadata } from '@remotion/media-utils';
import { VideoWithMotionGraphics } from './compositions/VideoWithMotionGraphics';
import { JesusChildhoodMiracles, TOTAL_FRAMES } from './compositions/JesusChildhoodMiracles';

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
      <Composition
        id="JesusChildhoodMiracles"
        component={JesusChildhoodMiracles}
        fps={30}
        width={1080}
        height={1920}
        durationInFrames={TOTAL_FRAMES}
      />
    </>
  );
};
