export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

const CANDIDATE_MIME_TYPES = [
  "video/webm;codecs=vp9",
  "video/webm;codecs=vp8",
  "video/webm",
  "video/mp4",
];

export function getSupportedMimeType(): string | null {
  if (typeof MediaRecorder === "undefined") return null;
  for (const type of CANDIDATE_MIME_TYPES) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return null;
}

export function extensionForMimeType(mimeType: string): string {
  return mimeType.includes("mp4") ? "mp4" : "webm";
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  alpha: number,
  zoom: number
) {
  ctx.globalAlpha = alpha;
  const imgRatio = img.width / img.height;
  const canvasRatio = width / height;
  let drawWidth: number;
  let drawHeight: number;
  if (imgRatio > canvasRatio) {
    drawHeight = height * zoom;
    drawWidth = drawHeight * imgRatio;
  } else {
    drawWidth = width * zoom;
    drawHeight = drawWidth / imgRatio;
  }
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
  ctx.globalAlpha = 1;
}

export async function renderSlideshowVideo(opts: {
  images: HTMLImageElement[];
  width: number;
  height: number;
  secondsPerScene: number;
  onProgress?: (fraction: number) => void;
}): Promise<{ blob: Blob; mimeType: string }> {
  const { images, width, height, secondsPerScene, onProgress } = opts;

  if (images.length === 0) {
    throw new Error("No images to render");
  }

  const mimeType = getSupportedMimeType();
  if (!mimeType) {
    throw new Error(
      "Your browser doesn't support recording video. Try the latest Chrome, Edge, or Firefox."
    );
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  const fps = 30;
  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 4_000_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const sceneDuration = secondsPerScene * 1000;
  const transitionDuration = Math.min(600, sceneDuration * 0.3);
  const totalDuration = images.length * sceneDuration;

  return new Promise((resolve, reject) => {
    recorder.onerror = () => reject(new Error("Recording failed"));
    recorder.onstop = () => {
      resolve({ blob: new Blob(chunks, { type: mimeType }), mimeType });
    };

    recorder.start();
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed >= totalDuration) {
        ctx.clearRect(0, 0, width, height);
        drawCover(ctx, images[images.length - 1], width, height, 1, 1.1);
        onProgress?.(1);
        recorder.stop();
        return;
      }

      const sceneIndex = Math.min(
        Math.floor(elapsed / sceneDuration),
        images.length - 1
      );
      const sceneElapsed = elapsed - sceneIndex * sceneDuration;
      const zoom = 1 + 0.1 * (sceneElapsed / sceneDuration);

      ctx.clearRect(0, 0, width, height);
      drawCover(ctx, images[sceneIndex], width, height, 1, zoom);

      if (
        sceneIndex < images.length - 1 &&
        sceneElapsed > sceneDuration - transitionDuration
      ) {
        const t =
          (sceneElapsed - (sceneDuration - transitionDuration)) /
          transitionDuration;
        drawCover(ctx, images[sceneIndex + 1], width, height, t, 1.0);
      }

      onProgress?.(elapsed / totalDuration);
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  });
}
