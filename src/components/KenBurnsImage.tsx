import React from 'react';
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';

export type CameraMovement =
  | 'zoom-in'
  | 'zoom-out'
  | 'pan-left'
  | 'pan-right'
  | 'pan-up'
  | 'pan-down'
  | 'drift';

const MOVEMENTS: Record<
  CameraMovement,
  { scale: [number, number]; x: [number, number]; y: [number, number] }
> = {
  'zoom-in': { scale: [1, 1.16], x: [0, 0], y: [0, 0] },
  'zoom-out': { scale: [1.16, 1], x: [0, 0], y: [0, 0] },
  'pan-left': { scale: [1.1, 1.1], x: [3, -3], y: [0, 0] },
  'pan-right': { scale: [1.1, 1.1], x: [-3, 3], y: [0, 0] },
  'pan-up': { scale: [1.1, 1.1], x: [0, 0], y: [3, -3] },
  'pan-down': { scale: [1.1, 1.1], x: [0, 0], y: [-3, 3] },
  drift: { scale: [1.06, 1.18], x: [-2.5, 2.5], y: [2, -2] },
};

const FADE = 18;

type Props = {
  src: string;
  durationInFrames: number;
  movement?: CameraMovement;
};

export const KenBurnsImage: React.FC<Props> = ({
  src,
  durationInFrames,
  movement = 'zoom-in',
}) => {
  const frame = useCurrentFrame();
  const preset = MOVEMENTS[movement];

  const progress = interpolate(frame, [0, Math.max(durationInFrames - 1, 1)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], preset.scale);
  const x = interpolate(progress, [0, 1], preset.x);
  const y = interpolate(progress, [0, 1], preset.y);

  const opacity = interpolate(
    frame,
    [0, FADE, durationInFrames - FADE, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translate(${x}%, ${y}%)`,
          transformOrigin: 'center',
        }}
      />
    </AbsoluteFill>
  );
};
