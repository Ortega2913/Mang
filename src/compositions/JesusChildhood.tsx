import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from 'remotion';

// ─── Helpers ────────────────────────────────────────────────────────────────

const useFade = (startFrame: number, endFrame: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, startFrame + 20, endFrame - 20, endFrame], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const Star: React.FC<{ x: number; y: number; size: number; delay: number }> = ({ x, y, size, delay }) => {
  const frame = useCurrentFrame();
  const twinkle = Math.sin((frame + delay) * 0.08) * 0.4 + 0.6;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'white',
        opacity: twinkle,
        boxShadow: `0 0 ${size * 2}px ${size}px rgba(255,255,200,0.6)`,
      }}
    />
  );
};

const stars = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 17.3 + 5) % 100,
  y: (i * 13.7 + 3) % 55,
  size: (i % 3) + 1,
  delay: i * 7,
}));

const NightSky: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background: 'linear-gradient(to bottom, #0a0a2e 0%, #0d1b4b 40%, #1a0a2e 80%, #2d1b00 100%)',
    }}
  >
    {stars.map((s, i) => (
      <Star key={i} {...s} />
    ))}
    {children}
  </AbsoluteFill>
);

const DaySky: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background: 'linear-gradient(to bottom, #87CEEB 0%, #e0f4ff 60%, #c8e6c9 100%)',
    }}
  >
    {children}
  </AbsoluteFill>
);

const SceneTitle: React.FC<{ title: string; subtitle?: string; fromFrame?: number }> = ({
  title,
  subtitle,
  fromFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - fromFrame, fps, config: { damping: 12, stiffness: 80 } });
  const opacity = interpolate(frame, [fromFrame, fromFrame + 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity,
        transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          borderRadius: 16,
          padding: '18px 48px',
          border: '1px solid rgba(255,215,0,0.35)',
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 52,
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255,215,0,0.6)',
            letterSpacing: 2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 28,
              color: '#f0e6c0',
              marginTop: 8,
              opacity: 0.9,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

const VerseText: React.FC<{ verse: string; reference: string; fromFrame?: number }> = ({
  verse,
  reference,
  fromFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [fromFrame, fromFrame + 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 100,
        right: 100,
        textAlign: 'center',
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: 30,
          color: '#f0e6c0',
          fontStyle: 'italic',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          lineHeight: 1.6,
        }}
      >
        "{verse}"
      </div>
      <div
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: 22,
          color: '#FFD700',
          marginTop: 10,
          opacity: 0.85,
        }}
      >
        — {reference}
      </div>
    </div>
  );
};

// ─── Scene 1: The Nativity ──────────────────────────────────────────────────
const NativityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const starGlow = interpolate(frame, [0, 60, 120, 180, 240, 300], [0, 1, 0.7, 1, 0.7, 1], {
    extrapolateRight: 'clamp',
  });

  const beamOpacity = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stableOpacity = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 60 } });

  const doveY = interpolate(frame, [0, 300], [0, -30], { easing: Easing.inOut(Easing.sin) });

  return (
    <NightSky>
      {/* Bright star of Bethlehem */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'white',
          boxShadow: `0 0 ${80 * starGlow}px ${40 * starGlow}px rgba(255,255,200,0.9)`,
        }}
      />
      {/* Star beam */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 4,
          height: '45%',
          background: 'linear-gradient(to bottom, rgba(255,255,200,0.7), rgba(255,255,200,0))',
          opacity: beamOpacity,
        }}
      />

      {/* Ground / hills */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to bottom, #4a3000 0%, #2d1a00 100%)',
          borderRadius: '60% 40% 0 0 / 20% 20% 0 0',
        }}
      />

      {/* Stable silhouette */}
      <div
        style={{
          position: 'absolute',
          bottom: '32%',
          left: '50%',
          transform: `translateX(-50%) scale(${stableOpacity})`,
          width: 320,
          opacity: stableOpacity,
        }}
      >
        {/* Roof */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '160px solid transparent',
            borderRight: '160px solid transparent',
            borderBottom: '100px solid #1a0f00',
            margin: '0 auto',
          }}
        />
        {/* Walls */}
        <div
          style={{
            height: 120,
            background: '#1a0f00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Manger glow */}
          <div
            style={{
              width: 80,
              height: 50,
              borderRadius: 8,
              background: `rgba(255,220,100,${0.3 + starGlow * 0.4})`,
              boxShadow: `0 0 30px 15px rgba(255,220,100,${0.2 + starGlow * 0.3})`,
            }}
          />
        </div>
      </div>

      {/* Floating dove */}
      <div
        style={{
          position: 'absolute',
          top: `${22 + doveY * 0.05}%`,
          left: '62%',
          fontSize: 32,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `translateY(${doveY}px)`,
        }}
      >
        🕊️
      </div>

      <SceneTitle title="The Birth of Jesus" subtitle="Bethlehem · ~4 BC" />
    </NightSky>
  );
};

// ─── Scene 2: The Wise Men ──────────────────────────────────────────────────
const WiseMenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wiseMenX = interpolate(frame, [0, 250], [-80, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });

  const giftGlow = interpolate(frame, [100, 180, 260, 300], [0, 1, 0.7, 1], { extrapolateRight: 'clamp' });

  const camelBob = Math.sin(frame * 0.12) * 4;

  return (
    <NightSky>
      {/* Desert dunes */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-10%',
          right: '-10%',
          height: '40%',
          background: '#c8a96e',
          borderRadius: '50% 60% 0 0 / 30% 30% 0 0',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '40%',
          right: '-10%',
          height: '30%',
          background: '#b8935a',
          borderRadius: '60% 40% 0 0 / 35% 25% 0 0',
        }}
      />

      {/* Guiding Star */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '75%',
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'white',
          boxShadow: `0 0 ${60 + giftGlow * 40}px ${30 + giftGlow * 20}px rgba(255,255,200,0.9)`,
        }}
      />

      {/* Three Wise Men with camels */}
      <div
        style={{
          position: 'absolute',
          bottom: '28%',
          left: `${10 + wiseMenX}%`,
          display: 'flex',
          gap: 60,
          transform: `translateY(${camelBob}px)`,
        }}
      >
        {['🐪', '🐫', '🐪'].map((emoji, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, color: '#FFD700', marginBottom: 4 }}>
              {i === 0 ? '👑' : i === 1 ? '⭐' : '🌟'}
            </div>
            <div style={{ fontSize: 56, transform: `translateY(${Math.sin((frame + i * 40) * 0.12) * 3}px)` }}>
              {emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Gifts */}
      <div
        style={{
          position: 'absolute',
          bottom: '22%',
          right: '20%',
          display: 'flex',
          gap: 20,
          opacity: interpolate(frame, [150, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        {['🥇', '🫙', '🌿'].map((g, i) => (
          <div
            key={i}
            style={{
              fontSize: 36,
              filter: `drop-shadow(0 0 ${8 * giftGlow}px gold)`,
            }}
          >
            {g}
          </div>
        ))}
      </div>

      <VerseText verse="We saw his star when it rose and have come to worship him." reference="Matthew 2:2" fromFrame={20} />
      <SceneTitle title="The Wise Men Arrive" subtitle="Gold · Frankincense · Myrrh" />
    </NightSky>
  );
};

// ─── Scene 3: Flight to Egypt ───────────────────────────────────────────────
const FlightToEgyptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const travelX = interpolate(frame, [0, 300], [0, -60], { extrapolateRight: 'clamp' });
  const moonGlow = 0.7 + Math.sin(frame * 0.05) * 0.3;
  const palmSway = Math.sin(frame * 0.06) * 3;

  const pyramidOpacity = interpolate(frame, [120, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <NightSky>
      {/* Moon */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '15%',
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: '#fffde0',
          boxShadow: `0 0 ${40 * moonGlow}px ${20 * moonGlow}px rgba(255,253,200,0.6)`,
        }}
      />

      {/* Desert ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '38%',
          background: 'linear-gradient(to bottom, #d4a84b 0%, #8b6914 100%)',
        }}
      />

      {/* Egyptian pyramids in the distance */}
      {[
        { left: '55%', w: 220, h: 160, opacity: pyramidOpacity },
        { left: '70%', w: 160, h: 120, opacity: pyramidOpacity * 0.9 },
        { left: '42%', w: 140, h: 100, opacity: pyramidOpacity * 0.8 },
      ].map(({ left, w, h, opacity }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: '37%',
            left,
            width: 0,
            height: 0,
            borderLeft: `${w / 2}px solid transparent`,
            borderRight: `${w / 2}px solid transparent`,
            borderBottom: `${h}px solid rgba(40,25,0,${opacity * 0.8})`,
            opacity,
          }}
        />
      ))}

      {/* Palm trees */}
      {[12, 28].map((leftPct, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: '36%',
            left: `${leftPct}%`,
            transform: `rotate(${palmSway * (i % 2 === 0 ? 1 : -1)}deg)`,
            transformOrigin: 'bottom center',
          }}
        >
          <div style={{ fontSize: 70 }}>🌴</div>
        </div>
      ))}

      {/* Holy family on donkey */}
      <div
        style={{
          position: 'absolute',
          bottom: '37%',
          left: `${30 + travelX}%`,
          transform: `translateY(${Math.sin(frame * 0.15) * 3}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ fontSize: 28 }}>🚶</div>
          <div style={{ fontSize: 52 }}>🫏</div>
          <div style={{ fontSize: 26, marginLeft: -20, marginBottom: 18 }}>🤱</div>
        </div>
      </div>

      <VerseText
        verse="Take the child and his mother and flee to Egypt."
        reference="Matthew 2:13"
        fromFrame={20}
      />
      <SceneTitle title="The Flight to Egypt" subtitle="Guided by an Angel's Warning" />
    </NightSky>
  );
};

// ─── Scene 4: Growing Up in Nazareth ────────────────────────────────────────
const NazarethScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const childX = interpolate(frame, [0, 300], [200, 900], {
    easing: Easing.inOut(Easing.sin),
    extrapolateRight: 'clamp',
  });

  const cloudX = interpolate(frame, [0, 300], [0, -80], { extrapolateRight: 'clamp' });
  const childBob = Math.sin(frame * 0.18) * 6;

  const hillOpacity = spring({ frame, fps, config: { damping: 20, stiffness: 40 } });

  return (
    <DaySky>
      {/* Sun */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '10%',
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: '#FFD700',
          boxShadow: '0 0 60px 30px rgba(255,215,0,0.4)',
        }}
      />

      {/* Clouds */}
      {[10, 35, 65].map((left, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${8 + i * 6}%`,
            left: `${left + cloudX * 0.4}%`,
            fontSize: 60 + i * 10,
            opacity: 0.85,
          }}
        >
          ☁️
        </div>
      ))}

      {/* Rolling hills */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-5%',
          right: '-5%',
          height: '50%',
          background: 'linear-gradient(to bottom, #5a8a3c 0%, #3d6b28 100%)',
          borderRadius: '40% 60% 0 0 / 25% 30% 0 0',
          opacity: hillOpacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '30%',
          right: '-5%',
          height: '40%',
          background: 'linear-gradient(to bottom, #4a7a30 0%, #2d5018 100%)',
          borderRadius: '60% 40% 0 0 / 35% 25% 0 0',
          opacity: hillOpacity,
        }}
      />

      {/* Nazareth village in background */}
      <div
        style={{
          position: 'absolute',
          bottom: '38%',
          left: '55%',
          opacity: hillOpacity * 0.9,
        }}
      >
        {['🏠', '🏛️', '🕍'].map((b, i) => (
          <span key={i} style={{ fontSize: 36, marginRight: 4 }}>
            {b}
          </span>
        ))}
      </div>

      {/* Young Jesus running */}
      <div
        style={{
          position: 'absolute',
          bottom: '35%',
          left: childX,
          transform: `translateY(${childBob}px)`,
          fontSize: 56,
        }}
      >
        🏃
      </div>

      {/* Flowers and nature */}
      <div
        style={{
          position: 'absolute',
          bottom: '33%',
          left: '5%',
          fontSize: 30,
          opacity: 0.9,
        }}
      >
        🌸🌼🌺🌻🌷
      </div>

      <VerseText
        verse="The child grew and became strong; he was filled with wisdom."
        reference="Luke 2:40"
        fromFrame={15}
      />
      <SceneTitle title="Childhood in Nazareth" subtitle="A Boy Filled with Grace" />
    </DaySky>
  );
};

// ─── Scene 5: Jesus in the Temple ───────────────────────────────────────────
const TempleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = 0.7 + Math.sin(frame * 0.07) * 0.3;
  const scrollFloat = Math.sin(frame * 0.06) * 8;

  const jesusFade = spring({ frame: frame - 20, fps, config: { damping: 18, stiffness: 70 } });
  const teachersFade = spring({ frame: frame - 40, fps, config: { damping: 18, stiffness: 70 } });
  const lightRay = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(to bottom, #2c1810 0%, #4a2c1a 30%, #8b6914 70%, #c8a96e 100%)',
      }}
    >
      {/* Temple columns */}
      {[8, 22, 36, 50, 64, 78, 92].map((left, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: '18%',
            left: `${left}%`,
            width: 28,
            height: '55%',
            background: 'linear-gradient(to right, #d4b896, #f0dcc0, #c8a878)',
            borderRadius: '4px 4px 0 0',
            boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
            opacity: 0.85,
          }}
        />
      ))}

      {/* Temple roof */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '5%',
          right: '5%',
          height: 50,
          background: 'linear-gradient(to bottom, #8b6914, #c8a96e)',
          borderRadius: '6px 6px 0 0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '0%',
          right: '0%',
          height: 50,
          background: '#8b6914',
          borderRadius: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '25%',
          right: '25%',
          height: 0,
          borderLeft: '25% solid transparent',
          borderRight: '25% solid transparent',
          borderBottom: '60px solid #6b4a0a',
        }}
      />

      {/* Divine light rays from above */}
      {[35, 50, 65].map((left, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '5%',
            left: `${left}%`,
            width: 3,
            height: '50%',
            background: `linear-gradient(to bottom, rgba(255,215,0,${0.5 * lightRay * glowPulse}), transparent)`,
            transform: `rotate(${(i - 1) * 8}deg)`,
            transformOrigin: 'top center',
          }}
        />
      ))}

      {/* Floating scrolls */}
      {[20, 50, 78].map((left, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${25 + i * 10}%`,
            left: `${left}%`,
            fontSize: 32,
            transform: `translateY(${Math.sin((frame + i * 40) * 0.06) * 8}px)`,
            opacity: 0.8,
          }}
        >
          📜
        </div>
      ))}

      {/* Temple floor */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20%',
          background: 'linear-gradient(to bottom, #c8a96e, #8b6914)',
        }}
      />

      {/* Jesus (center) */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '50%',
          transform: `translateX(-50%) scale(${jesusFade})`,
          textAlign: 'center',
          opacity: jesusFade,
        }}
      >
        <div style={{ fontSize: 64 }}>🧒</div>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: `rgba(255,215,0,${0.25 * glowPulse})`,
            boxShadow: `0 0 30px 15px rgba(255,215,0,${0.3 * glowPulse})`,
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Teachers/Elders on both sides */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '20%',
          transform: `scale(${teachersFade})`,
          opacity: teachersFade,
          display: 'flex',
          gap: 20,
        }}
      >
        {['🧓', '👴'].map((e, i) => (
          <div key={i} style={{ fontSize: 50 }}>
            {e}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '20%',
          transform: `scale(${teachersFade})`,
          opacity: teachersFade,
          display: 'flex',
          gap: 20,
        }}
      >
        {['👴', '🧓'].map((e, i) => (
          <div key={i} style={{ fontSize: 50 }}>
            {e}
          </div>
        ))}
      </div>

      <VerseText
        verse="Everyone who heard him was amazed at his understanding and his answers."
        reference="Luke 2:47"
        fromFrame={20}
      />
      <SceneTitle title="Jesus in the Temple" subtitle="Jerusalem · Age 12" />
    </AbsoluteFill>
  );
};

// ─── Scene 6: Growing in Wisdom – Closing ───────────────────────────────────
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const finalFade = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const glowPulse = 0.6 + Math.sin(frame * 0.06) * 0.4;
  const riseProgress = spring({ frame, fps, config: { damping: 20, stiffness: 50 } });

  const toolFloat = Math.sin(frame * 0.07) * 6;
  const lightScale = interpolate(frame, [0, 60, 180, 300], [0.5, 1.2, 1, 1.1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #0d1b4b 0%, #1a0a2e 50%, #2d1b00 100%)',
        opacity: finalFade,
      }}
    >
      {stars.slice(0, 40).map((s, i) => (
        <Star key={i} {...s} />
      ))}

      {/* Central divine light */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${lightScale})`,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,215,0,${0.15 * glowPulse}) 0%, transparent 70%)`,
          boxShadow: `0 0 120px 60px rgba(255,215,0,${0.08 * glowPulse})`,
        }}
      />

      {/* Carpenter tools */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: `translate(-50%, ${toolFloat}px)`,
          display: 'flex',
          gap: 30,
          opacity: interpolate(frame, [60, 100], [0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        {['🪚', '🔨', '📐', '🪵'].map((tool, i) => (
          <div
            key={i}
            style={{
              fontSize: 36,
              transform: `translateY(${Math.sin((frame + i * 30) * 0.07) * 5}px)`,
            }}
          >
            {tool}
          </div>
        ))}
      </div>

      {/* Young Jesus figure with halo */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: `translate(-50%, ${interpolate(riseProgress, [0, 1], [60, 0])}px)`,
          textAlign: 'center',
          opacity: riseProgress,
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ fontSize: 90 }}>🧑</div>
          {/* Halo */}
          <div
            style={{
              position: 'absolute',
              top: -15,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: `3px solid rgba(255,215,0,${glowPulse})`,
              boxShadow: `0 0 20px 8px rgba(255,215,0,${0.4 * glowPulse})`,
            }}
          />
        </div>
      </div>

      {/* Main verse */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [80, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 38,
            color: '#f0e6c0',
            fontStyle: 'italic',
            textShadow: '0 0 20px rgba(255,215,0,0.5)',
            lineHeight: 1.7,
            padding: '0 120px',
          }}
        >
          "Jesus grew in wisdom and stature,
          <br />
          and in favor with God and man."
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 28,
            color: '#FFD700',
            marginTop: 16,
            letterSpacing: 1,
          }}
        >
          — Luke 2:52
        </div>
      </div>

      {/* Title card */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [150, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 44,
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: `0 0 30px rgba(255,215,0,${glowPulse})`,
            letterSpacing: 4,
          }}
        >
          THE CHILDHOOD OF JESUS CHRIST
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ────────────────────────────────────────────────────────
export const JesusChildhood: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#000', fontFamily: 'Georgia, serif' }}>
      {/* Scene 1 – Nativity: 0–300 (10s) */}
      <Sequence from={0} durationInFrames={300}>
        <NativityScene />
      </Sequence>

      {/* Scene 2 – Wise Men: 300–600 (10s) */}
      <Sequence from={300} durationInFrames={300}>
        <WiseMenScene />
      </Sequence>

      {/* Scene 3 – Flight to Egypt: 600–900 (10s) */}
      <Sequence from={600} durationInFrames={300}>
        <FlightToEgyptScene />
      </Sequence>

      {/* Scene 4 – Nazareth Childhood: 900–1200 (10s) */}
      <Sequence from={900} durationInFrames={300}>
        <NazarethScene />
      </Sequence>

      {/* Scene 5 – Temple at 12: 1200–1500 (10s) */}
      <Sequence from={1200} durationInFrames={300}>
        <TempleScene />
      </Sequence>

      {/* Scene 6 – Closing / Wisdom: 1500–1800 (10s) */}
      <Sequence from={1500} durationInFrames={300}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
