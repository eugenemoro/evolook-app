import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { LookModel } from '@/lib/models/LookModel';
import { connectMongo } from '@/lib/mongo';

export async function POST(req: Request) {
  await connectMongo();

  try {
    const { title, brand, segment, items, prompt } = await req.json();

    const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    const look = await LookModel.create({
      title,
      brand,
      segment,
      items,
      imageUrl: `data:image/png;base64,${base64Image}`,
    });

    return NextResponse.json({ id: look._id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}