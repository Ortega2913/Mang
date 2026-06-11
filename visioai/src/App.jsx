import React, { useCallback, useEffect, useState } from 'react';
import {
  Sparkles,
  Wand2,
  Image as ImageIcon,
  Video,
  LayoutGrid,
  History as HistoryIcon,
  Settings as SettingsIcon,
  X,
  Download,
  Copy,
  RefreshCw,
  Heart,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  Trash2,
  Key,
  Check,
  Film,
  Palette,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STYLES = [
  'Photorealistic',
  'Anime',
  'Oil Painting',
  'Watercolor',
  'Cyberpunk',
  'Fantasy',
  'Minimalist',
  'Vintage',
];

const STYLE_BOOSTERS = {
  Photorealistic: 'photorealistic, DSLR photography, sharp focus, natural lighting, 85mm lens',
  Anime: 'anime style, vibrant colors, cel-shaded, studio quality illustration',
  'Oil Painting': 'oil painting, visible brushstrokes, canvas texture, classical fine art',
  Watercolor: 'watercolor painting, soft color washes, paper texture, delicate linework',
  Cyberpunk: 'cyberpunk aesthetic, neon lighting, futuristic cityscape, high contrast',
  Fantasy: 'epic fantasy art, magical atmosphere, ethereal lighting, intricate detail',
  Minimalist: 'minimalist composition, clean lines, negative space, simple palette',
  Vintage: 'vintage photography, retro color grading, film grain, nostalgic tone',
};

const QUALITY_BOOSTER = 'highly detailed, 8K resolution, professional photography, award-winning';

const ASPECT_RATIOS = [
  { id: 'square', label: 'Square', ratio: '1:1', w: 1024, h: 1024 },
  { id: 'portrait', label: 'Portrait', ratio: '2:3', w: 768, h: 1152 },
  { id: 'landscape', label: 'Landscape', ratio: '3:2', w: 1152, h: 768 },
  { id: 'widescreen', label: 'Widescreen', ratio: '16:9', w: 1344, h: 768 },
];

const VIDEO_STYLES = ['Cinematic', 'Animation', 'Abstract', 'Nature', 'Sci-Fi'];
const VIDEO_DURATIONS = [3, 5, 8];
const VIDEO_STEPS = ['Initializing model...', 'Generating frames...', 'Encoding video...', 'Finalizing...'];

// Public version hash for the lucataco/animate-diff model on Replicate.
const REPLICATE_VERSION = 'beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f';

const DEFAULT_SETTINGS = {
  showWatermark: false,
  safeMode: false,
  replicateToken: '',
  theme: 'Dark',
};

const THEMES = ['Dark', 'Darker', 'Midnight'];

const THEME_VARS = {
  Dark: { '--color-bg-primary': '#0A0A0F', '--color-bg-card': '#12121A', '--color-bg-elevated': '#1A1A28' },
  Darker: { '--color-bg-primary': '#050507', '--color-bg-card': '#0D0D14', '--color-bg-elevated': '#15151F' },
  Midnight: { '--color-bg-primary': '#03030B', '--color-bg-card': '#0A0A1C', '--color-bg-elevated': '#13132A' },
};

const GLOBAL_STYLES = `
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  .skeleton-shimmer {
    background: linear-gradient(90deg, #1A1A28 25%, #23233a 50%, #1A1A28 75%);
    background-size: 1000px 100%;
    animation: shimmer 1.8s infinite linear;
  }

  @keyframes image-materialize {
    0% { opacity: 0; filter: blur(16px) saturate(0.4); transform: scale(1.04); }
    100% { opacity: 1; filter: blur(0) saturate(1); transform: scale(1); }
  }
  .image-materialize {
    animation: image-materialize 0.9s ease-out;
  }

  @keyframes gradient-loop {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .video-mock-gradient {
    background: linear-gradient(120deg, #7C3AED, #A78BFA, #1A1A28, #4C1D95, #7C3AED);
    background-size: 300% 300%;
    animation: gradient-loop 8s ease infinite;
  }

  @keyframes toast-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-toast-in {
    animation: toast-in 0.2s ease-out;
  }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildImageUrl(prompt, { width, height, seed, negativePrompt, safeMode, hideWatermark }) {
  const params = new URLSearchParams();
  params.set('width', String(width));
  params.set('height', String(height));
  params.set('seed', String(seed));
  params.set('model', 'flux');
  if (hideWatermark) params.set('nologo', 'true');
  if (safeMode) params.set('safe', 'true');
  if (negativePrompt && negativePrompt.trim()) {
    params.set('negative_prompt', negativePrompt.trim());
  }
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;
}

function enhancePrompt(prompt, style) {
  const trimmed = prompt.trim();
  if (!trimmed) return trimmed;
  const styleBooster = STYLE_BOOSTERS[style];
  const additions = [styleBooster, QUALITY_BOOSTER].filter(Boolean);
  const lowerPrompt = trimmed.toLowerCase();
  const remaining = additions.filter((part) => !lowerPrompt.includes(part.toLowerCase()));
  if (remaining.length === 0) return trimmed;
  return [trimmed, ...remaining].join(', ');
}

async function downloadFile(url, filename) {
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) throw new Error('Network response was not ok');
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

function formatTimestamp(ts) {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function randomSeed() {
  return Math.floor(Math.random() * 1_000_000);
}

function durationToFrames(seconds) {
  return Math.round(seconds * 8);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Small reusable UI pieces
// ---------------------------------------------------------------------------

function PillButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
        active
          ? 'bg-accent border-accent text-white shadow-[0_0_16px_rgba(124,58,237,0.5)]'
          : 'bg-bg-elevated border-white/5 text-text-muted hover:text-text-primary hover:border-accent/40'
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 py-3 cursor-pointer">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
          checked ? 'bg-accent' : 'bg-bg-elevated'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}

function ToastContainer({ toasts }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 left-4 sm:left-auto z-[100] flex flex-col gap-2 sm:w-full sm:max-w-sm items-end"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium animate-toast-in ${
            toast.type === 'success'
              ? 'bg-success/10 border-success/30 text-success'
              : toast.type === 'error'
              ? 'bg-error/10 border-error/30 text-error'
              : 'bg-accent/10 border-accent/30 text-accent-light'
          }`}
        >
          {toast.type === 'success' && <Check size={16} className="flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle size={16} className="flex-shrink-0" />}
          {toast.type === 'info' && <Sparkles size={16} className="flex-shrink-0" />}
          <span className="text-text-primary">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function Header({ activeTab, onTabChange, onOpenHistory, onOpenSettings }) {
  const tabs = [
    { id: 'image', label: 'Image Generator', icon: ImageIcon },
    { id: 'video', label: 'Video Generator', icon: Video },
    { id: 'gallery', label: 'Gallery', icon: LayoutGrid },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-bg-primary/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            <Sparkles className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-text-primary leading-tight">VisioAI</h1>
            <p className="text-xs text-text-muted leading-tight">Free AI Creative Studio</p>
          </div>
        </div>

        <nav
          className="flex items-center gap-1 bg-bg-card rounded-xl p-1 order-3 sm:order-2 w-full sm:w-auto overflow-x-auto"
          aria-label="Main navigation"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                  active ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 order-2 sm:order-3">
          <button
            type="button"
            onClick={onOpenHistory}
            aria-label="View generation history"
            className="p-2.5 rounded-lg bg-bg-card hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <HistoryIcon size={18} />
          </button>
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Open settings"
            className="p-2.5 rounded-lg bg-bg-card hover:bg-bg-elevated text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <SettingsIcon size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Welcome banner
// ---------------------------------------------------------------------------

function WelcomeBanner({ onDismiss }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 w-full">
      <div className="flex items-start gap-3 bg-gradient-to-r from-accent/20 to-accent-light/10 border border-accent/30 rounded-xl p-4">
        <Sparkles className="text-accent-light flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary">Welcome to VisioAI!</p>
          <p className="text-sm text-text-muted mt-0.5">
            Generate stunning AI images and videos for free — no sign-up, no API keys required. Pick a style, write
            a prompt, and hit generate.
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss welcome message"
          className="text-text-muted hover:text-text-primary flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// History panel
// ---------------------------------------------------------------------------

function HistoryThumbnail({ item }) {
  const [error, setError] = useState(false);

  if (!item.thumbnail || error) {
    return item.type === 'video' ? (
      <Film size={18} className="text-text-muted" />
    ) : (
      <ImageIcon size={18} className="text-text-muted" />
    );
  }

  return <img src={item.thumbnail} alt="" onError={() => setError(true)} className="w-full h-full object-cover" />;
}

function HistoryPanel({ open, history, onClose, onSelect }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-bg-card border-l border-white/5 z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Generation history"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <HistoryIcon size={18} className="text-accent-light" /> History
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close history panel"
            className="text-text-muted hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {history.length === 0 ? (
            <p className="text-sm text-text-muted text-center mt-8 px-4">
              No generations yet. Your recent prompts will show up here.
            </p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-bg-elevated transition-colors duration-150 text-left"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-bg-elevated flex-shrink-0 flex items-center justify-center">
                  <HistoryThumbnail item={item} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text-primary truncate">{item.prompt}</p>
                  <p className="text-xs text-text-muted">
                    {formatTimestamp(item.timestamp)} · {item.style}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  );
}

// ---------------------------------------------------------------------------
// Settings modal
// ---------------------------------------------------------------------------

function SettingsModal({ open, settings, onChange, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="relative bg-bg-card border border-white/5 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 id="settings-title" className="text-lg font-bold text-text-primary flex items-center gap-2">
            <SettingsIcon size={18} className="text-accent-light" /> Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="text-text-muted hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="divide-y divide-white/5">
          <Toggle
            label="Show watermark"
            description="Display the Pollinations logo on generated images"
            checked={settings.showWatermark}
            onChange={(v) => onChange({ ...settings, showWatermark: v })}
          />
          <Toggle
            label="Safe mode"
            description='Appends "safe for work" to every prompt'
            checked={settings.safeMode}
            onChange={(v) => onChange({ ...settings, safeMode: v })}
          />
        </div>

        <div className="py-4 border-t border-white/5">
          <label htmlFor="replicate-token" className="text-sm font-medium text-text-primary flex items-center gap-2 mb-1">
            <Key size={14} /> Replicate API token
          </label>
          <p className="text-xs text-text-muted mb-2">
            Optional — enables real AI video generation. Get a free token at replicate.com.
          </p>
          <input
            id="replicate-token"
            type="password"
            value={settings.replicateToken}
            onChange={(e) => onChange({ ...settings, replicateToken: e.target.value })}
            placeholder="r8_..."
            className="w-full bg-bg-elevated border border-white/5 rounded-lg px-3 py-2 text-sm text-text-primary font-mono placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="py-4 border-t border-white/5">
          <p className="text-sm font-medium text-text-primary flex items-center gap-2 mb-2">
            <Palette size={14} /> Theme
          </p>
          <div className="flex gap-2">
            {THEMES.map((theme) => (
              <PillButton key={theme} active={settings.theme === theme} onClick={() => onChange({ ...settings, theme })}>
                {theme}
              </PillButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image generator
// ---------------------------------------------------------------------------

function ImageCard({ image, onDownload, onCopyPrompt, onRegenerate }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className="relative group rounded-2xl overflow-hidden bg-bg-card border border-white/5"
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      {!loaded && !error && <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <AlertCircle size={28} className="text-error" />
          <p className="text-sm text-text-muted">Couldn't load this image.</p>
          <button
            type="button"
            onClick={() => {
              setError(false);
              setLoaded(false);
              onRegenerate(image);
            }}
            className="text-sm font-semibold text-accent-light hover:text-white underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      ) : (
        <img
          src={image.url}
          alt={image.prompt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100 image-materialize' : 'opacity-0'
          }`}
        />
      )}

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-white/0 group-hover:ring-accent/60 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.45)]"
        aria-hidden="true"
      />

      {loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onDownload(image)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-accent text-white text-xs font-semibold backdrop-blur transition-colors duration-150"
            >
              <Download size={14} /> Download
            </button>
            <button
              type="button"
              onClick={() => onCopyPrompt(image.prompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-accent text-white text-xs font-semibold backdrop-blur transition-colors duration-150"
            >
              <Copy size={14} /> Copy Prompt
            </button>
            <button
              type="button"
              onClick={() => {
                setLoaded(false);
                onRegenerate(image);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-accent text-white text-xs font-semibold backdrop-blur transition-colors duration-150"
            >
              <RefreshCw size={14} /> Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageGeneratorTab({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  showNegative,
  setShowNegative,
  style,
  setStyle,
  aspectRatio,
  setAspectRatio,
  imageCount,
  setImageCount,
  seed,
  setSeed,
  images,
  isGenerating,
  onGenerate,
  onEnhance,
  enhanceDiff,
  onDownload,
  onCopyPrompt,
  onRegenerate,
}) {
  const handlePromptKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt */}
      <div>
        <div className="flex items-center justify-between mb-2 gap-2">
          <label htmlFor="prompt" className="text-sm font-semibold text-text-primary">
            Prompt
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={onEnhance}
              className="flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:text-white transition-colors duration-150"
            >
              <Sparkles size={14} /> Enhance
            </button>
            {enhanceDiff && (
              <div className="absolute right-0 top-full mt-2 w-72 max-w-[80vw] bg-bg-elevated border border-accent/30 rounded-lg p-3 text-xs text-text-muted shadow-xl z-20 animate-toast-in">
                <p className="font-semibold text-text-primary mb-1">Prompt enhanced</p>
                <p className="mb-1">
                  <span className="text-text-muted">Before:</span> {enhanceDiff.before}
                </p>
                <p>
                  <span className="text-accent-light">After:</span> {enhanceDiff.after}
                </p>
              </div>
            )}
          </div>
        </div>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handlePromptKeyDown}
          rows={3}
          placeholder="A cinematic sunset over ancient ruins, golden hour, 8K..."
          className="w-full bg-bg-card border border-white/5 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-150"
        />
      </div>

      {/* Negative prompt */}
      <div>
        <button
          type="button"
          onClick={() => setShowNegative(!showNegative)}
          aria-expanded={showNegative}
          className="flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-150"
        >
          {showNegative ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          Negative prompt (optional)
        </button>
        {showNegative && (
          <textarea
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            rows={2}
            placeholder="blurry, low quality, distorted, watermark, text..."
            className="mt-2 w-full bg-bg-card border border-white/5 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-150"
          />
        )}
      </div>

      {/* Style selector */}
      <div>
        <p className="text-sm font-semibold text-text-primary mb-2">Style</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <PillButton key={s} active={style === s} onClick={() => setStyle(s)}>
              {s}
            </PillButton>
          ))}
        </div>
      </div>

      {/* Aspect ratio */}
      <div>
        <p className="text-sm font-semibold text-text-primary mb-2">Aspect ratio</p>
        <div className="flex flex-wrap gap-2">
          {ASPECT_RATIOS.map((ar) => {
            const active = aspectRatio.id === ar.id;
            return (
              <PillButton key={ar.id} active={active} onClick={() => setAspectRatio(ar)}>
                {ar.label} <span className={`font-mono ${active ? 'text-white/70' : 'text-text-muted'}`}>({ar.ratio})</span>
              </PillButton>
            );
          })}
        </div>
      </div>

      {/* Image count + seed */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-text-primary mb-2">Number of images</p>
          <div className="flex gap-2">
            {[1, 2, 4].map((n) => (
              <PillButton key={n} active={imageCount === n} onClick={() => setImageCount(n)}>
                {n}
              </PillButton>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="seed" className="text-sm font-semibold text-text-primary mb-2 block">
            Seed (optional)
          </label>
          <input
            id="seed"
            type="number"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Random"
            className="w-full bg-bg-card border border-white/5 rounded-xl px-4 py-2.5 text-text-primary font-mono placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-150"
          />
        </div>
      </div>

      {/* Generate button */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-light text-white font-bold py-3.5 rounded-xl shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_36px_rgba(124,58,237,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>

      {/* Results */}
      {images.length > 0 && (
        <>
          <div
            className={`grid gap-4 ${
              images.length === 1 ? 'grid-cols-1 max-w-xl mx-auto' : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {images.map((img) => (
              <ImageCard
                key={`${img.id}-${img.seed}`}
                image={img}
                onDownload={onDownload}
                onCopyPrompt={onCopyPrompt}
                onRegenerate={onRegenerate}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-text-muted bg-bg-card border border-white/5 rounded-xl p-4">
            <span>
              Model: <span className="text-accent-light">flux</span>
            </span>
            <span>
              Seeds: <span className="text-accent-light">{images.map((i) => i.seed).join(', ')}</span>
            </span>
            <span>
              Dimensions:{' '}
              <span className="text-accent-light">
                {images[0].width}×{images[0].height}
              </span>
            </span>
            <span>
              Style: <span className="text-accent-light">{images[0].style}</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Video generator
// ---------------------------------------------------------------------------

function ProgressSteps({ step }) {
  const progress = ((step + 1) / VIDEO_STEPS.length) * 100;
  return (
    <div className="bg-bg-card border border-white/5 rounded-xl p-4 space-y-3">
      <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="space-y-1.5">
        {VIDEO_STEPS.map((label, i) => (
          <li
            key={label}
            className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
              i <= step ? 'text-text-primary' : 'text-text-muted'
            }`}
          >
            {i < step ? (
              <Check size={14} className="text-success flex-shrink-0" />
            ) : i === step ? (
              <Loader2 size={14} className="animate-spin text-accent-light flex-shrink-0" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-full border border-white/10 inline-block flex-shrink-0" />
            )}
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VideoGeneratorTab({
  videoPrompt,
  setVideoPrompt,
  videoStyle,
  setVideoStyle,
  videoDuration,
  setVideoDuration,
  isGenerating,
  progressStep,
  videoResult,
  onGenerate,
  hasReplicateToken,
}) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="video-prompt" className="text-sm font-semibold text-text-primary mb-2 block">
          Prompt
        </label>
        <textarea
          id="video-prompt"
          value={videoPrompt}
          onChange={(e) => setVideoPrompt(e.target.value)}
          rows={3}
          placeholder="A dragon flying over a medieval castle, cinematic, slow motion"
          className="w-full bg-bg-card border border-white/5 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-150"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-text-primary mb-2">Style</p>
        <div className="flex flex-wrap gap-2">
          {VIDEO_STYLES.map((s) => (
            <PillButton key={s} active={videoStyle === s} onClick={() => setVideoStyle(s)}>
              {s}
            </PillButton>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-text-primary mb-2">Duration</p>
        <div className="flex gap-2">
          {VIDEO_DURATIONS.map((d) => (
            <PillButton key={d} active={videoDuration === d} onClick={() => setVideoDuration(d)}>
              {d}s
            </PillButton>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || !videoPrompt.trim()}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-light text-white font-bold py-3.5 rounded-xl shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_36px_rgba(124,58,237,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Film size={20} />}
        {isGenerating ? 'Generating Video...' : 'Generate Video'}
      </button>

      {isGenerating && <ProgressSteps step={progressStep} />}

      {!isGenerating && videoResult && (
        <div className="space-y-3">
          {videoResult.type === 'real' ? (
            <video src={videoResult.url} controls loop className="w-full rounded-2xl border border-white/5 bg-black" />
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 video-mock-gradient flex items-center justify-center">
              <div className="text-center px-4">
                <Film size={36} className="mx-auto mb-2 text-white/80" />
                <p className="text-white font-semibold">Demo preview</p>
                <p className="text-white/70 text-sm mt-1">
                  {videoDuration}s · {videoStyle}
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-text-muted bg-bg-card border border-white/5 rounded-xl p-4">
            <span>
              Style: <span className="text-accent-light">{videoStyle}</span>
            </span>
            <span>
              Duration: <span className="text-accent-light">{videoDuration}s</span>
            </span>
            <span>
              Source: <span className="text-accent-light">{videoResult.type === 'real' ? 'Replicate' : 'Demo'}</span>
            </span>
          </div>
        </div>
      )}

      {!hasReplicateToken && (
        <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 rounded-xl p-4">
          <Key className="text-accent-light flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-text-muted">
            Real video generation requires a free <span className="text-text-primary font-medium">Replicate API token</span>.
            Add yours in <span className="text-text-primary font-medium">Settings</span> to unlock AI-generated video — until
            then, you'll see a demo preview.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

function GalleryImage({ item }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="aspect-square bg-bg-elevated flex items-center justify-center">
        <ImageIcon size={28} className="text-text-muted" />
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={item.prompt}
      loading="lazy"
      onError={() => setError(true)}
      className="w-full h-auto block"
    />
  );
}

function GalleryTab({ gallery, filter, setFilter, onToggleFavorite, onDownload, onClear }) {
  const filtered = gallery.filter((item) => {
    if (filter === 'Favorites') return item.favorite;
    if (filter === 'Images') return item.type === 'image';
    if (filter === 'Videos') return item.type === 'video';
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {['All', 'Favorites', 'Images', 'Videos'].map((f) => (
            <PillButton key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </PillButton>
          ))}
        </div>
        {gallery.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 text-sm font-medium text-error hover:text-red-400 transition-colors duration-150"
          >
            <Trash2 size={14} /> Clear Gallery
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
          <div className="w-16 h-16 rounded-2xl bg-bg-card border border-white/5 flex items-center justify-center">
            <ImageIcon size={28} className="text-text-muted" />
          </div>
          <p className="text-text-primary font-semibold">Your creations will appear here</p>
          <p className="text-text-muted text-sm max-w-xs">
            Generate images or videos and they'll be saved to your gallery automatically.
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-2xl overflow-hidden break-inside-avoid bg-bg-card border border-white/5 mb-4"
            >
              {item.type === 'video' ? (
                <div className="aspect-video video-mock-gradient flex items-center justify-center">
                  <Film size={28} className="text-white/80" />
                </div>
              ) : (
                <GalleryImage item={item} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(item.id)}
                    aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
                    className={`p-2 rounded-lg backdrop-blur transition-colors duration-150 ${
                      item.favorite ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-accent'
                    }`}
                  >
                    <Heart size={14} fill={item.favorite ? 'currentColor' : 'none'} />
                  </button>
                  {item.type === 'image' && (
                    <button
                      type="button"
                      onClick={() => onDownload(item)}
                      aria-label="Download"
                      className="p-2 rounded-lg bg-white/10 hover:bg-accent text-white backdrop-blur transition-colors duration-150"
                    >
                      <Download size={14} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-white line-clamp-3">{item.prompt}</p>
              </div>
              {item.favorite && (
                <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-accent/90 text-white">
                  <Heart size={12} fill="currentColor" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 mt-12">
      <p className="text-center text-sm text-text-muted">Powered by free AI models</p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Main App
// ---------------------------------------------------------------------------

export default function App() {
  const [activeTab, setActiveTab] = useState('image');
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [gallery, setGallery] = useState([]);
  const [history, setHistory] = useState([]);
  const [galleryFilter, setGalleryFilter] = useState('All');

  // Image generator state
  const [prompt, setPrompt] = useState(
    'A majestic lion in a golden field at sunset, ultra-detailed, cinematic lighting'
  );
  const [negativePrompt, setNegativePrompt] = useState('');
  const [showNegative, setShowNegative] = useState(false);
  const [style, setStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[2]); // Landscape
  const [imageCount, setImageCount] = useState(1);
  const [seed, setSeed] = useState('');
  const [images, setImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [enhanceDiff, setEnhanceDiff] = useState(null);

  // Video generator state
  const [videoPrompt, setVideoPrompt] = useState('A dragon flying over a medieval castle, cinematic, slow motion');
  const [videoStyle, setVideoStyle] = useState('Cinematic');
  const [videoDuration, setVideoDuration] = useState(5);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoStep, setVideoStep] = useState(0);
  const [videoResult, setVideoResult] = useState(null);

  // ---- Load persisted state ----
  useEffect(() => {
    try {
      const visited = localStorage.getItem('visioai_visited');
      if (!visited) {
        setShowWelcome(true);
        localStorage.setItem('visioai_visited', 'true');
      }
      const savedGallery = localStorage.getItem('visioai_gallery');
      if (savedGallery) setGallery(JSON.parse(savedGallery));
      const savedHistory = localStorage.getItem('visioai_history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      const savedSettings = localStorage.getItem('visioai_settings');
      if (savedSettings) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
    } catch {
      // localStorage unavailable or corrupted — continue with defaults
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('visioai_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('visioai_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('visioai_settings', JSON.stringify(settings));
  }, [settings]);

  // ---- Toasts ----
  const showToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // ---- Gallery / history helpers ----
  const addToGallery = useCallback((item) => {
    setGallery((prev) => [{ id: `${Date.now()}-${Math.random()}`, favorite: false, timestamp: Date.now(), ...item }, ...prev]);
  }, []);

  const addToHistory = useCallback((item) => {
    setHistory((prev) =>
      [{ id: `${Date.now()}-${Math.random()}`, timestamp: Date.now(), ...item }, ...prev].slice(0, 20)
    );
  }, []);

  // ---- Image generation ----
  const handleGenerate = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      showToast('Please enter a prompt first', 'error');
      return;
    }

    setIsGenerating(true);
    setEnhanceDiff(null);

    const finalPrompt =
      settings.safeMode && !/safe for work/i.test(trimmed) ? `${trimmed}, safe for work` : trimmed;

    const baseSeed = seed !== '' && !Number.isNaN(Number(seed)) ? parseInt(seed, 10) : randomSeed();

    const newImages = Array.from({ length: imageCount }, (_, i) => {
      const imgSeed = baseSeed + i;
      return {
        id: `${Date.now()}-${i}`,
        url: buildImageUrl(finalPrompt, {
          width: aspectRatio.w,
          height: aspectRatio.h,
          seed: imgSeed,
          negativePrompt,
          safeMode: settings.safeMode,
          hideWatermark: !settings.showWatermark,
        }),
        seed: imgSeed,
        width: aspectRatio.w,
        height: aspectRatio.h,
        prompt: finalPrompt,
        style,
      };
    });

    setImages(newImages);
    setIsGenerating(false);

    newImages.forEach((img) => {
      addToGallery({
        type: 'image',
        url: img.url,
        prompt: img.prompt,
        seed: img.seed,
        width: img.width,
        height: img.height,
        style: img.style,
      });
    });
    addToHistory({ type: 'image', prompt: finalPrompt, style, thumbnail: newImages[0].url });

    showToast(`Image${newImages.length > 1 ? 's' : ''} generated!`, 'success');
    showToast('Saved to gallery', 'info');
  }, [prompt, negativePrompt, style, aspectRatio, imageCount, seed, settings, addToGallery, addToHistory, showToast]);

  const handleRegenerate = useCallback(
    (image) => {
      const newSeed = randomSeed();
      const updatedUrl = buildImageUrl(image.prompt, {
        width: image.width,
        height: image.height,
        seed: newSeed,
        negativePrompt,
        safeMode: settings.safeMode,
        hideWatermark: !settings.showWatermark,
      });
      setImages((prev) =>
        prev.map((img) => (img.id === image.id ? { ...img, seed: newSeed, url: updatedUrl } : img))
      );
      addToGallery({
        type: 'image',
        url: updatedUrl,
        prompt: image.prompt,
        seed: newSeed,
        width: image.width,
        height: image.height,
        style: image.style,
      });
    },
    [negativePrompt, settings, addToGallery]
  );

  const handleDownload = useCallback(
    async (image) => {
      try {
        await downloadFile(image.url, `visioai-${image.seed}.jpg`);
        showToast('Image downloaded!', 'success');
      } catch {
        showToast('Download failed — try right-click → Save image instead.', 'error');
      }
    },
    [showToast]
  );

  const handleCopyPrompt = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
      } catch {
        showToast('Could not copy to clipboard.', 'error');
      }
    },
    [showToast]
  );

  const handleEnhance = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      showToast('Write a prompt first to enhance it.', 'error');
      return;
    }
    const enhanced = enhancePrompt(trimmed, style);
    if (enhanced === trimmed) {
      showToast('Prompt is already enhanced!', 'info');
      return;
    }
    setEnhanceDiff({ before: trimmed, after: enhanced });
    setPrompt(enhanced);
    setTimeout(() => setEnhanceDiff(null), 6000);
  }, [prompt, style, showToast]);

  // ---- Video generation ----
  const runMockGeneration = useCallback(
    (finalPrompt) =>
      new Promise((resolve) => {
        let i = 0;
        setVideoStep(0);
        const interval = setInterval(() => {
          i += 1;
          if (i < VIDEO_STEPS.length) {
            setVideoStep(i);
          } else {
            clearInterval(interval);
            setVideoResult({ type: 'mock' });
            addToGallery({ type: 'video', url: null, prompt: finalPrompt, style: videoStyle, duration: videoDuration });
            addToHistory({ type: 'video', prompt: finalPrompt, style: videoStyle, thumbnail: null });
            showToast('Demo video ready!', 'success');
            resolve();
          }
        }, 1500);
      }),
    [videoStyle, videoDuration, addToGallery, addToHistory, showToast]
  );

  const handleGenerateVideo = useCallback(async () => {
    const trimmed = videoPrompt.trim();
    if (!trimmed) {
      showToast('Please enter a video prompt first', 'error');
      return;
    }

    setIsGeneratingVideo(true);
    setVideoResult(null);
    setVideoStep(0);

    const finalPrompt = settings.safeMode && !/safe for work/i.test(trimmed) ? `${trimmed}, safe for work` : trimmed;
    const token = settings.replicateToken.trim();

    if (token) {
      try {
        const startRes = await fetch('https://api.replicate.com/v1/predictions', {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            version: REPLICATE_VERSION,
            input: {
              prompt: `${finalPrompt}, ${videoStyle.toLowerCase()} style`,
              num_frames: durationToFrames(videoDuration),
              guidance_scale: 7.5,
            },
          }),
        });

        if (!startRes.ok) {
          const errBody = await startRes.json().catch(() => ({}));
          throw new Error(errBody.detail || `Replicate API error (${startRes.status})`);
        }

        let prediction = await startRes.json();
        setVideoStep(1);

        while (prediction.status === 'starting' || prediction.status === 'processing') {
          await sleep(3000);
          const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
            headers: { Authorization: `Token ${token}` },
          });
          if (!pollRes.ok) throw new Error(`Replicate API error (${pollRes.status})`);
          prediction = await pollRes.json();
          if (prediction.status === 'processing') setVideoStep(2);
        }

        if (prediction.status === 'succeeded') {
          setVideoStep(3);
          const outputUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
          setVideoResult({ type: 'real', url: outputUrl });
          addToGallery({ type: 'video', url: outputUrl, prompt: finalPrompt, style: videoStyle, duration: videoDuration });
          addToHistory({ type: 'video', prompt: finalPrompt, style: videoStyle, thumbnail: null });
          showToast('Video generated!', 'success');
        } else {
          throw new Error(prediction.error || 'Video generation failed on Replicate.');
        }
      } catch (err) {
        showToast(`Replicate error: ${err.message}. Showing demo preview instead.`, 'error');
        await runMockGeneration(finalPrompt);
      } finally {
        setIsGeneratingVideo(false);
      }
    } else {
      await runMockGeneration(finalPrompt);
      setIsGeneratingVideo(false);
    }
  }, [videoPrompt, videoStyle, videoDuration, settings, addToGallery, addToHistory, showToast, runMockGeneration]);

  // ---- History ----
  const handleHistorySelect = useCallback(
    (item) => {
      if (item.type === 'video') {
        setActiveTab('video');
        setVideoPrompt(item.prompt);
        setVideoStyle(item.style);
      } else {
        setActiveTab('image');
        setPrompt(item.prompt);
        setStyle(item.style);
      }
      setShowHistory(false);
      showToast('Prompt loaded from history', 'info');
    },
    [showToast]
  );

  // ---- Gallery ----
  const handleToggleFavorite = useCallback((id) => {
    setGallery((prev) => prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item)));
  }, []);

  const handleGalleryDownload = useCallback(
    async (item) => {
      try {
        await downloadFile(item.url, `visioai-${item.id}.jpg`);
        showToast('Image downloaded!', 'success');
      } catch {
        showToast('Download failed — try right-click → Save image instead.', 'error');
      }
    },
    [showToast]
  );

  const handleClearGallery = useCallback(() => {
    setGallery([]);
    showToast('Gallery cleared', 'info');
  }, [showToast]);

  return (
    <div
      className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-sans overflow-x-hidden"
      style={THEME_VARS[settings.theme]}
    >
      <style>{GLOBAL_STYLES}</style>

      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenHistory={() => setShowHistory(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {showWelcome && <WelcomeBanner onDismiss={() => setShowWelcome(false)} />}

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {activeTab === 'image' && (
          <ImageGeneratorTab
            prompt={prompt}
            setPrompt={setPrompt}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            showNegative={showNegative}
            setShowNegative={setShowNegative}
            style={style}
            setStyle={setStyle}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            imageCount={imageCount}
            setImageCount={setImageCount}
            seed={seed}
            setSeed={setSeed}
            images={images}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            onEnhance={handleEnhance}
            enhanceDiff={enhanceDiff}
            onDownload={handleDownload}
            onCopyPrompt={handleCopyPrompt}
            onRegenerate={handleRegenerate}
          />
        )}
        {activeTab === 'video' && (
          <VideoGeneratorTab
            videoPrompt={videoPrompt}
            setVideoPrompt={setVideoPrompt}
            videoStyle={videoStyle}
            setVideoStyle={setVideoStyle}
            videoDuration={videoDuration}
            setVideoDuration={setVideoDuration}
            isGenerating={isGeneratingVideo}
            progressStep={videoStep}
            videoResult={videoResult}
            onGenerate={handleGenerateVideo}
            hasReplicateToken={!!settings.replicateToken.trim()}
          />
        )}
        {activeTab === 'gallery' && (
          <GalleryTab
            gallery={gallery}
            filter={galleryFilter}
            setFilter={setGalleryFilter}
            onToggleFavorite={handleToggleFavorite}
            onDownload={handleGalleryDownload}
            onClear={handleClearGallery}
          />
        )}
      </main>

      <Footer />

      <HistoryPanel open={showHistory} history={history} onClose={() => setShowHistory(false)} onSelect={handleHistorySelect} />

      <SettingsModal open={showSettings} settings={settings} onChange={setSettings} onClose={() => setShowSettings(false)} />

      <ToastContainer toasts={toasts} />
    </div>
  );
}
