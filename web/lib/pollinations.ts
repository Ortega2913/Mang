export function buildImageUrl(opts: {
  prompt: string;
  width: number;
  height: number;
  model: string;
  seed: number;
}): string {
  const { prompt, width, height, model, seed } = opts;
  const params = new URLSearchParams({
    prompt,
    width: String(width),
    height: String(height),
    model,
    seed: String(seed),
  });
  return `/api/image?${params.toString()}`;
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 1_000_000);
}
