const HF_API_TOKEN = process.env.HF_API_TOKEN!;
const headers = {
  Authorization: `Bearer ${HF_API_TOKEN}`,
  "Content-Type": "application/json",
};

export async function generateFromPrompt(prompt: string): Promise<Buffer> {
  const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
    method: "POST",
    headers,
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) throw new Error("HuggingFace prompt generation failed");
  return Buffer.from(await response.arrayBuffer());
}

export async function generateFromImage(imageBuffer: Buffer): Promise<Buffer> {
  const response = await fetch("https://api-inference.huggingface.co/models/Xenova/controlnet-canny-sdxl", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_TOKEN}`,
    },
    body: imageBuffer,
  });

  if (!response.ok) throw new Error("HuggingFace image generation failed");
  return Buffer.from(await response.arrayBuffer());
}