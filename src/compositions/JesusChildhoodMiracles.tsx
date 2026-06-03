import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

// ─── SCENE DATA ───────────────────────────────────────────────────────────────
interface Scene {
  id: number;
  type: 'title' | 'scene' | 'end';
  label: string;
  headline: string[];
  bg: string;
  accent: string;
  symbol: string;
  duration: number;
  number?: string;
  sub?: string;
  tag?: string;
  year?: string;
  body?: string;
  verse?: string;
  particles?: string;
}

const SCENES: Scene[] = [
  {
    id: 0, type: 'title', label: 'CHILDHOOD MIRACLES',
    headline: ['THE BOY', 'WHO WAS', 'GOD'],
    sub: 'The Hidden Years of Jesus of Nazareth',
    tag: 'Luke 2 · Matthew 2 · Infancy Gospels',
    year: '~6 BC — 12 AD',
    bg: 'radial-gradient(ellipse at 30% 70%, #2a1a0a 0%, #0d0a05 60%, #0a0805 100%)',
    accent: '#c9881a', symbol: '✦', duration: 5000,
  },
  {
    id: 1, type: 'scene', number: 'I', label: 'BETHLEHEM · BIRTH',
    headline: ['LIGHT IN', 'DARKNESS'],
    body: 'The night He was born, a star ignited over the East. Shepherds trembled. Angels split the sky. The stable glowed with a light that had no source.',
    verse: '"Glory to God in the highest" — Luke 2:14',
    tag: '~ 6 B.C. · BETHLEHEM',
    bg: 'radial-gradient(ellipse at 50% 30%, #1a1208 0%, #0a0805 70%)',
    accent: '#d4a843', particles: 'stars', symbol: '☆', duration: 5500,
  },
  {
    id: 2, type: 'scene', number: 'II', label: 'THE MAGI · GIFTS',
    headline: ['KINGS BOW', 'TO A CHILD'],
    body: 'Three wise men from the East crossed deserts following a star. They knelt before a child and offered gold, frankincense, and myrrh — the gifts of a king, a priest, and a sacrifice.',
    verse: '"We saw his star when it rose" — Matthew 2:2',
    tag: '~ 5 B.C. · BETHLEHEM',
    bg: 'radial-gradient(ellipse at 70% 20%, #150f08 0%, #0a0805 60%)',
    accent: '#c94b2a', particles: 'sand', symbol: '★', duration: 5500,
  },
  {
    id: 3, type: 'scene', number: 'III', label: 'EGYPT · PROTECTION',
    headline: ['FLEE INTO', 'THE NIGHT'],
    body: "An angel warned Joseph in a dream. That same night they fled — an infant King becoming a refugee, fulfilling the ancient word: 'Out of Egypt I called my son.'",
    verse: '"Out of Egypt I called my son" — Matthew 2:15',
    tag: '~ 4 B.C. · EGYPT',
    bg: 'radial-gradient(ellipse at 20% 80%, #12100a 0%, #080705 70%)',
    accent: '#8b6914', particles: 'dust', symbol: '◈', duration: 5500,
  },
  {
    id: 4, type: 'scene', number: 'IV', label: 'NAZARETH · GROWING',
    headline: ['WISDOM &', 'STATURE'],
    body: "In the carpenter's workshop, the one who made the universe learned to work wood. His hands shaped tables and doors. He grew in wisdom, stature, and favor — fully God, fully learning to be human.",
    verse: '"The child grew and became strong" — Luke 2:40',
    tag: '~ 4 B.C.–12 AD · NAZARETH',
    bg: 'radial-gradient(ellipse at 50% 60%, #0f0c08 0%, #080705 70%)',
    accent: '#7a9e6a', particles: 'sawdust', symbol: '⊕', duration: 5500,
  },
  {
    id: 5, type: 'scene', number: 'V', label: 'JERUSALEM · TEMPLE',
    headline: ['LOST FOR', '3 DAYS'],
    body: "At twelve, He vanished during Passover. His parents searched in anguish for three days. They found Him in the Temple — not lost, but teaching the teachers, astonishing those who heard.",
    verse: "\"Did you not know I must be in my Father's house?\" — Luke 2:49",
    tag: '~ 12 AD · JERUSALEM',
    bg: 'radial-gradient(ellipse at 60% 30%, #1a1408 0%, #0a0805 60%)',
    accent: '#d4a843', particles: 'gold', symbol: '⬡', duration: 5500,
  },
  {
    id: 6, type: 'end', label: 'THE SILENT YEARS',
    headline: ['WHAT ELSE', 'WAS HIDDEN?'],
    sub: 'Scripture says: the world itself could not contain the books that would be written.',
    verse: '"Jesus did many other things" — John 21:25',
    tag: 'THE STORY CONTINUES',
    bg: 'radial-gradient(ellipse at 50% 50%, #1a1208 0%, #050403 80%)',
    accent: '#c9881a', symbol: '✦', duration: 6000,
  },
];

// ─── FRAME MATH ───────────────────────────────────────────────────────────────
const FPS = 30;
const sceneStarts: number[] = [];
export const TOTAL_FRAMES: number = (() => {
  let total = 0;
  for (const s of SCENES) {
    sceneStarts.push(total);
    total += Math.round((s.duration / 1000) * FPS);
  }
  return total;
})();

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────────
function clamp(v: number) {
  return { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
}

function fadeUp(sf: number, delayS: number, durS: number, finalOpacity = 1) {
  const t = interpolate(sf, [delayS * FPS, (delayS + durS) * FPS], [0, 1], clamp());
  return { opacity: t * finalOpacity, transform: `translateY(${(1 - t) * 18}px)` };
}

function slideLeft(sf: number, delayS: number, durS: number) {
  const t = interpolate(sf, [delayS * FPS, (delayS + durS) * FPS], [0, 1], clamp());
  return { opacity: t, transform: `translateX(${(1 - t) * -18}px)` };
}

function expandX(sf: number, delayS: number, durS: number) {
  const t = interpolate(sf, [delayS * FPS, (delayS + durS) * FPS], [0, 1], clamp());
  return { transform: `scaleX(${t})`, transformOrigin: 'left' as const };
}

function scratchStyle(frame: number, i: number) {
  const durF = (3.5 + i) * FPS;
  const delayF = i * 1.3 * FPS;
  const t = ((frame + delayF) % durF) / durF;
  const left = interpolate(t, [0, 1], [-5, 108]);
  const opacity =
    t < 0.08 ? interpolate(t, [0, 0.08], [0, 0.12]) :
    t < 0.92 ? interpolate(t, [0.08, 0.92], [0.12, 0.08]) :
               interpolate(t, [0.92, 1], [0.08, 0]);
  return { left: `${left}%`, opacity };
}

function flickerOpacity(frame: number) {
  const t = (frame % (5 * FPS)) / (5 * FPS);
  if (t >= 0.91 && t < 0.92) return interpolate(t, [0.91, 0.92], [1, 0.2]);
  if (t >= 0.92 && t < 0.93) return interpolate(t, [0.92, 0.93], [0.2, 1]);
  if (t >= 0.97 && t < 0.98) return interpolate(t, [0.97, 0.975], [0.5, 1]);
  return 1;
}

function symbolGlowStyle(frame: number, accent: string) {
  const period = 3 * FPS;
  const t = (frame % (period * 2)) / (period * 2);
  const p = t < 0.5 ? t * 2 : (1 - t) * 2;
  const opacity = 0.5 + p * 0.5;
  const blur = 6 + p * 14;
  return { opacity, textShadow: `0 0 ${blur}px ${accent}, 0 0 ${blur * 2}px ${accent}` };
}

function rayOpacity(frame: number, periodS: number, delayS: number) {
  const pF = periodS * FPS;
  const t = ((frame + delayS * FPS) % (pF * 2)) / (pF * 2);
  const p = t < 0.5 ? t * 2 : (1 - t) * 2;
  return 0.3 + p * 0.6;
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────
function Particles({ type, frame }: { type: string; frame: number }) {
  const particles = useMemo(() =>
    Array.from({ length: 18 }).map((_, i) => {
      const h1 = ((i * 7919 + 3) % 10000) / 10000;
      const h2 = ((i * 6271 + 5) % 10000) / 10000;
      const h3 = ((i * 4637 + 7) % 10000) / 10000;
      const h4 = ((i * 3313 + 11) % 10000) / 10000;
      return {
        x: h1 * 100,
        delay: h2 * 4,
        dur: 4 + h3 * 6,
        alpha: type === 'stars' ? 0.4 + h4 * 0.5
          : type === 'gold'  ? 0.5 + h4 * 0.4
          : type === 'sand'  ? 0.3 + h4 * 0.3
          : 0.2 + h4 * 0.2,
        xDrift: [20, -15, 30][i % 3] as number,
      };
    }),
    [type]
  );

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6, overflow: 'hidden' }}>
      {particles.map((p, i) => {
        const size = type === 'stars' ? 2 : type === 'gold' ? 3 : 1.5;
        const color = type === 'stars' ? `rgba(212,168,67,${p.alpha})`
          : type === 'gold' ? `rgba(201,136,26,${p.alpha})`
          : type === 'sand' ? `rgba(180,140,80,${p.alpha})`
          : `rgba(200,190,170,${p.alpha})`;
        const t = ((frame / FPS + p.delay) % p.dur) / p.dur;
        const opacity = t < 0.1 ? t * 10 : t < 0.9 ? 1 - (t - 0.1) * 0.5 : (1 - t) * 5;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${p.x}%`, bottom: '-5%',
            width: size, height: type === 'stars' ? size : size * 3,
            borderRadius: type === 'stars' ? '50%' : 1,
            background: color, opacity,
            transform: `translateY(${-110 * t}vh) translateX(${p.xDrift * t}px)`,
            boxShadow: type === 'stars' ? `0 0 ${size * 2}px ${color}` : 'none',
          }} />
        );
      })}
    </div>
  );
}

// ─── DIVINE RAYS ─────────────────────────────────────────────────────────────
function DivineRays({ accent, frame }: { accent: string; frame: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {[0, 30, 60, 90, 130, 170, 210, 260, 310].map((angle, i) => (
        <div key={i} style={{
          position: 'absolute', top: '35%', left: '50%',
          width: '200%', height: 1,
          background: `linear-gradient(90deg, transparent, ${accent}18, transparent)`,
          transformOrigin: '0 50%',
          transform: `rotate(${angle}deg)`,
          opacity: rayOpacity(frame, 3 + i * 0.3, i * 0.2),
        }} />
      ))}
    </div>
  );
}

// ─── SCENE SLIDE ─────────────────────────────────────────────────────────────
function SceneSlide({ scene, sf, progress, frame }: {
  scene: Scene; sf: number; progress: number; frame: number;
}) {
  const isTitle = scene.type === 'title';
  const isEnd = scene.type === 'end';
  const GRAIN_SVG = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E";

  return (
    <div style={{ position: 'absolute', inset: 0, background: scene.bg }}>
      {/* Halftone */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '7px 7px', pointerEvents: 'none',
      }} />

      {/* Divine rays (title/end only) */}
      {(isTitle || isEnd) && <DivineRays accent={scene.accent} frame={frame} />}

      {/* Particles */}
      {scene.particles && <Particles type={scene.particles} frame={frame} />}

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 7, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
      }} />

      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none',
        backgroundImage: `url("${GRAIN_SVG}")`,
        opacity: 0.4, mixBlendMode: 'overlay',
      }} />

      {/* Scratch lines */}
      {[0, 1, 2].map(i => {
        const s = scratchStyle(frame, i);
        return (
          <div key={i} style={{
            position: 'absolute', top: 0, zIndex: 8, pointerEvents: 'none',
            width: i === 2 ? 2 : 1, height: '100%',
            background: 'rgba(255,255,255,0.12)',
            left: s.left, opacity: s.opacity,
          }} />
        );
      })}

      {/* Symbol */}
      <div style={{
        position: 'absolute', top: 18, right: 20, zIndex: 15,
        fontFamily: 'serif', fontSize: 22, color: scene.accent,
        ...symbolGlowStyle(frame, scene.accent),
      }}>
        {scene.symbol}
      </div>

      {/* Scene number badge */}
      {!isTitle && !isEnd && (
        <div style={{
          position: 'absolute', top: 16, left: 18, zIndex: 15,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 11, letterSpacing: 4, color: scene.accent,
          textTransform: 'uppercase', opacity: 0.8,
        }}>
          {scene.number}
        </div>
      )}

      {/* Ghost big number */}
      {!isTitle && !isEnd && (
        <div style={{
          position: 'absolute', right: -8, top: '10%', zIndex: 0,
          fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
          fontSize: 160, lineHeight: 1, color: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none', userSelect: 'none', letterSpacing: -5,
        }}>
          {scene.number}
        </div>
      )}

      {/* Top tag */}
      <div style={{
        position: 'absolute', top: 44, left: 18, right: 18, zIndex: 15,
        ...slideLeft(sf, 0.2, 0.7),
      }}>
        <span style={{
          fontFamily: 'monospace', fontSize: 9, letterSpacing: 5,
          textTransform: 'uppercase', color: 'rgba(200,190,170,0.5)',
          borderLeft: `2px solid ${scene.accent}`,
          paddingLeft: 8, display: 'inline-block',
          background: 'rgba(0,0,0,0.4)',
        }}>
          {scene.tag}
        </span>
      </div>

      {/* ── TITLE CARD ── */}
      {isTitle && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '0 24px',
        }}>
          <div style={{
            fontFamily: 'monospace', fontSize: 9, letterSpacing: 6,
            color: scene.accent, textTransform: 'uppercase', marginBottom: 12,
            ...fadeUp(sf, 0.3, 0.6),
          }}>
            {scene.label}
          </div>
          {scene.headline.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 68, lineHeight: 0.95, letterSpacing: 2, color: '#e8dcc8',
              textShadow: `3px 3px 0 ${scene.accent}55, 6px 6px 0 rgba(0,0,0,0.4)`,
              ...fadeUp(sf, 0.4 + i * 0.12, 0.7),
            }}>{line}</div>
          ))}
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 12,
            color: 'rgba(200,190,170,0.65)', marginTop: 14,
            fontStyle: 'italic', letterSpacing: 1,
            ...fadeUp(sf, 0.8, 0.8),
          }}>
            {scene.sub}
          </div>
          <div style={{
            marginTop: 20, fontFamily: 'monospace', fontSize: 9,
            letterSpacing: 4, color: scene.accent,
            ...fadeUp(sf, 1.0, 0.6, 0.7),
          }}>
            {scene.year}
          </div>
        </div>
      )}

      {/* ── STORY SCENE ── */}
      {!isTitle && !isEnd && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '80px 22px 90px',
        }}>
          <div style={{ marginBottom: 14 }}>
            {scene.headline.map((line, i) => (
              <div key={i} style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: 58, lineHeight: 0.92, letterSpacing: 2, color: '#e8dcc8',
                textShadow: `2px 2px 0 ${scene.accent}66`,
                ...fadeUp(sf, 0.2 + i * 0.1, 0.6),
              }}>{line}</div>
            ))}
          </div>
          <div style={{
            width: 40, height: 2, background: scene.accent, marginBottom: 12,
            ...expandX(sf, 0.5, 0.6),
          }} />
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 11.5,
            color: 'rgba(220,210,190,0.8)', lineHeight: 1.7, marginBottom: 14,
            ...fadeUp(sf, 0.6, 0.7),
          }}>
            {scene.body}
          </div>
          <div style={{
            fontFamily: 'monospace', fontSize: 9.5,
            color: scene.accent, letterSpacing: 1,
            borderLeft: `2px solid ${scene.accent}`,
            paddingLeft: 10, fontStyle: 'italic',
            ...fadeUp(sf, 0.8, 0.6),
          }}>
            {scene.verse}
          </div>
        </div>
      )}

      {/* ── END CARD ── */}
      {isEnd && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '0 24px', textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'monospace', fontSize: 9, letterSpacing: 6,
            color: scene.accent, textTransform: 'uppercase', marginBottom: 14,
            ...fadeUp(sf, 0.3, 0.6),
          }}>
            {scene.label}
          </div>
          {scene.headline.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 60, lineHeight: 0.94, letterSpacing: 2, color: '#e8dcc8',
              textShadow: `3px 3px 0 ${scene.accent}44`,
              ...fadeUp(sf, 0.4 + i * 0.12, 0.7),
            }}>{line}</div>
          ))}
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 12,
            color: 'rgba(200,190,170,0.6)', marginTop: 14, fontStyle: 'italic',
            ...fadeUp(sf, 0.7, 0.7),
          }}>
            {scene.sub}
          </div>
          <div style={{
            marginTop: 20, fontFamily: 'monospace', fontSize: 10,
            color: scene.accent, letterSpacing: 3,
            ...fadeUp(sf, 0.9, 0.6, 0.8),
          }}>
            {scene.verse}
          </div>
        </div>
      )}

      {/* Timestamp */}
      <div style={{
        position: 'absolute', bottom: 14, right: 14, zIndex: 15,
        fontFamily: 'monospace', fontSize: 8,
        color: 'rgba(200,160,80,0.5)', letterSpacing: 2,
        opacity: flickerOpacity(frame),
      }}>
        {scene.year || '~12 AD'}
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, zIndex: 20,
        height: 2, background: scene.accent,
        width: `${progress * 100}%`,
        boxShadow: `0 0 8px ${scene.accent}`,
      }} />
    </div>
  );
}

// ─── MAIN COMPOSITION ────────────────────────────────────────────────────────
export const JesusChildhoodMiracles: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine current scene
  let sceneIdx = SCENES.length - 1;
  for (let i = 0; i < sceneStarts.length - 1; i++) {
    if (frame < sceneStarts[i + 1]) { sceneIdx = i; break; }
  }

  const scene = SCENES[sceneIdx];
  const sf = frame - sceneStarts[sceneIdx];
  const durFrames = Math.round((scene.duration / 1000) * FPS);
  const progress = Math.min(sf / durFrames, 1);

  // Film-flash at scene transitions
  const flashOpacity = sceneIdx > 0
    ? interpolate(sf, [0, 10], [0.85, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
    : 0;

  // Scale 390×693 design → 1080×1920
  const DESIGN_W = 390;
  const DESIGN_H = DESIGN_W * (16 / 9);
  const scale = 1080 / DESIGN_W;

  return (
    <AbsoluteFill style={{ background: '#050403' }}>
      {/* Font loader */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital@0;1&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Scaled reel */}
      <div style={{
        width: DESIGN_W, height: DESIGN_H,
        transform: `scale(${scale})`,
        transformOrigin: '0 0',
        position: 'relative', overflow: 'hidden',
        filter: 'contrast(1.12) saturate(0.75) sepia(0.15)',
      }}>
        <SceneSlide scene={scene} sf={sf} progress={progress} frame={frame} />

        {/* Film flash */}
        {flashOpacity > 0.01 && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 45,
            background: '#e8dcc8', opacity: flashOpacity,
            pointerEvents: 'none',
          }} />
        )}
      </div>
    </AbsoluteFill>
  );
};
