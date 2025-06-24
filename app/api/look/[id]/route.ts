import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongo } from '@/lib/mongo';
import { LookModel } from '@/lib/models/LookModel';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const look = await LookModel.findById(id).lean().select('-__v');
    if (!look) return NextResponse.json({ error: 'Look not found' }, { status: 404 });

    return NextResponse.json(look);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}