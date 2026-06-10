import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

type Beam = {
  id: number;
  originXPercent: number;
  baseAngle: number;
  speed: number;
  swing: number;
  color: string;
  width: number;
};

// Deterministic spotlight rig — four beams sweeping at different
// speeds/angles so the stage never looks static.
const BEAMS: Beam[] = [
  { id: 0, originXPercent: 12, baseAngle: -18, speed: 0.018, swing: 30, color: 'rgba(255,45,95,0.22)', width: 240 },
  { id: 1, originXPercent: 38, baseAngle: 14, speed: -0.014, swing: 38, color: 'rgba(70,150,255,0.20)', width: 220 },
  { id: 2, originXPercent: 64, baseAngle: -10, speed: 0.016, swing: 34, color: 'rgba(190,70,255,0.20)', width: 230 },
  { id: 3, originXPercent: 88, baseAngle: 20, speed: -0.02, swing: 28, color: 'rgba(255,205,70,0.18)', width: 210 },
];

export const StageLights: React.FC = () => {
  const frame = useCurrentFrame();

  // Soft fade-in so the rig doesn't pop on frame 0
  const intro = Math.min(1, frame / 24);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'screen', opacity: intro }}>
      {BEAMS.map((b) => {
        const angle = b.baseAngle + Math.sin(frame * b.speed + b.id * 1.7) * b.swing;
        return (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              top: -120,
              left: `${b.originXPercent}%`,
              width: b.width,
              height: 1500,
              background: `linear-gradient(to bottom, ${b.color} 0%, ${b.color} 25%, transparent 78%)`,
              transformOrigin: 'top center',
              transform: `translateX(-50%) rotate(${angle}deg)`,
              filter: 'blur(22px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
