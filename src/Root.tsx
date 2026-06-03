import React from "react";
import { Composition, Series, Audio, staticFile } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { Scene1Alex } from "./scenes/Scene1Alex";
import { Scene2Grandma } from "./scenes/Scene2Grandma";
import { Scene3Redemption } from "./scenes/Scene3Redemption";
import { CreditsScene } from "./scenes/CreditsScene";

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

// Scene durations in frames
const TITLE_DURATION = 170;
const SCENE1_DURATION = 820;
const SCENE2_DURATION = 1010;
const SCENE3_DURATION = 530;
const CREDITS_DURATION = 300;

const TOTAL_FRAMES =
  TITLE_DURATION + SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + CREDITS_DURATION;

const EchoesInTheVoid: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={TITLE_DURATION}>
        <TitleScene />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE1_DURATION}>
        <Scene1Alex />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE2_DURATION}>
        <Scene2Grandma />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE3_DURATION}>
        <Scene3Redemption />
      </Series.Sequence>

      <Series.Sequence durationInFrames={CREDITS_DURATION}>
        <CreditsScene />
      </Series.Sequence>
    </Series>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EchoesInTheVoid"
        component={EchoesInTheVoid}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Individual scene previews */}
      <Composition
        id="TitleScene"
        component={TitleScene}
        durationInFrames={TITLE_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene1-AlexApartment"
        component={Scene1Alex}
        durationInFrames={SCENE1_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene2-GrandmaRose"
        component={Scene2Grandma}
        durationInFrames={SCENE2_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Scene3-Redemption"
        component={Scene3Redemption}
        durationInFrames={SCENE3_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CreditsScene"
        component={CreditsScene}
        durationInFrames={CREDITS_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
