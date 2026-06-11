export type GenerationMode = {
  id: string;
  label: string;
  description: string;
  needsImage?: boolean;
};

export const generationModes: GenerationMode[] = [
  {
    id: "text-to-video",
    label: "Text to Video",
    description: "Describe a scene and turn it into a cinematic video clip.",
  },
  {
    id: "image-to-video",
    label: "Image to Video",
    description: "Bring a still photo to life with realistic motion.",
    needsImage: true,
  },
  {
    id: "text-to-image",
    label: "Text to Image",
    description: "Generate high-resolution images from a text prompt.",
  },
  {
    id: "ai-avatar",
    label: "AI Avatar",
    description: "Create a talking digital avatar from a photo and script.",
    needsImage: true,
  },
];

export type AiModel = {
  id: string;
  name: string;
  provider: string;
  badge?: string;
  gradient: string;
};

export const aiModels: AiModel[] = [
  { id: "veo3", name: "Veo 3", provider: "Google", badge: "New", gradient: "from-blue-500 to-cyan-400" },
  { id: "kling25", name: "Kling 2.5", provider: "Kuaishou", gradient: "from-rose-500 to-pink-400" },
  { id: "runway-gen4", name: "Runway Gen-4", provider: "Runway", gradient: "from-violet-500 to-indigo-400" },
  { id: "luma-ray3", name: "Luma Ray3", provider: "Luma AI", gradient: "from-amber-400 to-orange-500" },
  { id: "hailuo23", name: "Hailuo 2.3", provider: "MiniMax", badge: "Hot", gradient: "from-emerald-500 to-teal-400" },
  { id: "pika22", name: "Pika 2.2", provider: "Pika Labs", gradient: "from-fuchsia-500 to-purple-400" },
  { id: "vidu-q1", name: "Vidu Q1", provider: "Vidu", gradient: "from-sky-500 to-blue-400" },
  { id: "pixverse-v4", name: "PixVerse V4", provider: "PixVerse", gradient: "from-lime-400 to-green-500" },
];

export const aspectRatios = ["16:9", "9:16", "1:1", "4:3"];
export const durations = ["5s", "8s", "10s"];

export type ShowcaseItem = {
  id: string;
  title: string;
  prompt: string;
  model: string;
  type: "video" | "image";
  gradient: string;
};

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "sc1",
    title: "Neon city flyover",
    prompt: "Aerial drone shot flying through a neon-lit cyberpunk city at night, rain reflections",
    model: "Veo 3",
    type: "video",
    gradient: "from-indigo-600 via-purple-600 to-pink-500",
  },
  {
    id: "sc2",
    title: "Portrait to motion",
    prompt: "A woman in a red coat turns to smile at the camera on a busy street in autumn",
    model: "Kling 2.5",
    type: "video",
    gradient: "from-orange-500 via-rose-500 to-red-500",
  },
  {
    id: "sc3",
    title: "Fantasy castle",
    prompt: "Epic fantasy castle floating above the clouds, golden hour lighting, hyper detailed",
    model: "Text to Image",
    type: "image",
    gradient: "from-amber-400 via-orange-500 to-red-400",
  },
  {
    id: "sc4",
    title: "Underwater coral reef",
    prompt: "Slow motion camera gliding through a vibrant coral reef teeming with tropical fish",
    model: "Luma Ray3",
    type: "video",
    gradient: "from-cyan-500 via-teal-500 to-emerald-400",
  },
  {
    id: "sc5",
    title: "Studio product shot",
    prompt: "Minimalist studio photo of a perfume bottle on a marble pedestal, soft shadows",
    model: "Text to Image",
    type: "image",
    gradient: "from-slate-400 via-gray-300 to-zinc-400",
  },
  {
    id: "sc6",
    title: "Talking AI avatar",
    prompt: "A friendly presenter avatar explaining a product update in front of a gradient backdrop",
    model: "AI Avatar",
    type: "video",
    gradient: "from-violet-500 via-fuchsia-500 to-pink-400",
  },
  {
    id: "sc7",
    title: "Mountain timelapse",
    prompt: "Timelapse of clouds rolling over snowy mountain peaks at sunrise",
    model: "Hailuo 2.3",
    type: "video",
    gradient: "from-blue-400 via-indigo-400 to-violet-500",
  },
  {
    id: "sc8",
    title: "Anime character",
    prompt: "Anime-style portrait of a warrior with glowing blue eyes and silver armor",
    model: "Text to Image",
    type: "image",
    gradient: "from-pink-400 via-fuchsia-400 to-purple-500",
  },
];

export type Tool = {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
};

export const tools: Tool[] = [
  {
    id: "video-generator",
    name: "AI Video Generator",
    description: "Create cinematic videos from text or images using top models like Veo 3 and Kling.",
    icon: "Clapperboard",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    id: "image-generator",
    name: "AI Image Generator",
    description: "Turn any idea into stunning, high-resolution artwork in seconds.",
    icon: "Image",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "ai-avatar",
    name: "AI Avatar Generator",
    description: "Create talking digital avatars and presenters from a single photo.",
    icon: "UserRound",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "lip-sync",
    name: "AI Lip Sync",
    description: "Sync any face to any audio track with realistic lip movements.",
    icon: "AudioLines",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "face-swap",
    name: "AI Face Swap",
    description: "Seamlessly swap faces in photos and videos while preserving lighting.",
    icon: "Repeat",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "video-effects",
    name: "AI Video Effects",
    description: "Apply trending one-click effects like hug, transform and zoom-out reveals.",
    icon: "Sparkles",
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "image-upscaler",
    name: "AI Image Upscaler",
    description: "Upscale and enhance images up to 4K without losing detail.",
    icon: "Maximize2",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    id: "background-remover",
    name: "Background Remover",
    description: "Instantly remove or replace backgrounds from any image.",
    icon: "Layers",
    gradient: "from-lime-500 to-green-500",
  },
  {
    id: "ai-anime",
    name: "AI Anime Generator",
    description: "Convert photos into anime-style art or generate brand new characters.",
    icon: "Wand2",
    gradient: "from-purple-500 to-violet-500",
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Choose a model & mode",
    description:
      "Pick from text-to-video, image-to-video, text-to-image and more, then choose the AI model that fits your style.",
  },
  {
    number: "02",
    title: "Describe your vision",
    description:
      "Write a prompt or upload a reference image, set your aspect ratio and duration, then hit generate.",
  },
  {
    number: "03",
    title: "Download & share",
    description:
      "Preview your AI-generated content, regenerate variations, and export in HD whenever you're ready.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Maya Chen",
    role: "Content Creator",
    quote:
      "Switching between AI models used to mean ten different tabs. Now I generate, compare and export everything from one workspace.",
    rating: 5,
  },
  {
    name: "Daniel Reyes",
    role: "Marketing Lead",
    quote:
      "We produce a week's worth of social video content in an afternoon. The image-to-video tool alone paid for our subscription.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Indie Filmmaker",
    quote:
      "The model variety is unreal — I storyboard with text-to-image, then animate the best frames straight into video.",
    rating: 4,
  },
  {
    name: "Tom Becker",
    role: "Game Studio Artist",
    quote:
      "Concept art that used to take days now takes minutes. The upscaler keeps everything print-ready.",
    rating: 5,
  },
];

export type PricingPlan = {
  name: string;
  price: { monthly: number; yearly: number };
  credits: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    credits: "300 credits / month",
    description: "Try every tool with no commitment.",
    features: [
      "Access to core video & image models",
      "Standard generation speed",
      "720p video exports",
      "Community gallery sharing",
    ],
    cta: "Start for free",
  },
  {
    name: "Plus",
    price: { monthly: 12, yearly: 9 },
    credits: "2,000 credits / month",
    description: "For creators who post regularly.",
    features: [
      "All Free features",
      "Priority generation queue",
      "1080p video exports",
      "Access to premium models",
      "No watermark",
    ],
    highlighted: true,
    cta: "Get Plus",
  },
  {
    name: "Pro",
    price: { monthly: 32, yearly: 25 },
    credits: "6,000 credits / month",
    description: "For professionals & small teams.",
    features: [
      "All Plus features",
      "Fastest generation speed",
      "4K image upscaling",
      "Commercial usage rights",
      "Early access to new models",
    ],
    cta: "Get Pro",
  },
  {
    name: "Premium",
    price: { monthly: 90, yearly: 72 },
    credits: "20,000 credits / month",
    description: "For studios with heavy workloads.",
    features: [
      "All Pro features",
      "Dedicated rendering capacity",
      "Team workspace & shared assets",
      "API access",
      "Priority support",
    ],
    cta: "Get Premium",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Is this AI generation studio really free to use?",
    answer:
      "Yes. The Free plan gives you monthly credits to try every generation mode and most AI models, no credit card required.",
  },
  {
    question: "Which AI models are available?",
    answer:
      "The studio brings together leading video and image models including Veo 3, Kling, Runway, Luma, Hailuo, Pika, Vidu and PixVerse, all from a single prompt box.",
  },
  {
    question: "Can I use generated content commercially?",
    answer:
      "Paid plans include commercial usage rights for content you generate, so you can use it in marketing, social media, and client work.",
  },
  {
    question: "Do I need design or filmmaking experience?",
    answer:
      "Not at all. Just describe what you want in plain language, choose a model and style, and the AI handles the rest. Templates and example prompts help you get started.",
  },
  {
    question: "Can I deploy and host this site myself?",
    answer:
      "Yes — this project is a static Next.js export that deploys for free to GitHub Pages, Vercel, or Netlify in just a few clicks.",
  },
];

export type NavItem = {
  label: string;
  href: string;
  items?: { label: string; href: string; description?: string }[];
};

export const navItems: NavItem[] = [
  {
    label: "AI Video",
    href: "/create#text-to-video",
    items: [
      { label: "Text to Video", href: "/create#text-to-video", description: "Generate video from a text prompt" },
      { label: "Image to Video", href: "/create#image-to-video", description: "Animate any photo" },
      { label: "AI Avatar", href: "/create#ai-avatar", description: "Talking avatar videos" },
      { label: "Lip Sync", href: "/#tools", description: "Sync lips to any audio" },
    ],
  },
  {
    label: "AI Image",
    href: "/create#text-to-image",
    items: [
      { label: "Text to Image", href: "/create#text-to-image", description: "Generate art from text" },
      { label: "Image Upscaler", href: "/#tools", description: "Enhance to 4K" },
      { label: "Background Remover", href: "/#tools", description: "Remove backgrounds instantly" },
      { label: "AI Anime Generator", href: "/#tools", description: "Anime-style art" },
    ],
  },
  { label: "Tools", href: "/#tools" },
  { label: "Pricing", href: "/pricing" },
];
