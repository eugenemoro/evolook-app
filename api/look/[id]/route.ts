import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongodb';
import LookModel from '@/lib/models/LookModel';
import mongoose from 'mongoose';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const look = await LookModel.findById(id)
      .lean()
      .select('-__v'); // убрать системные поля

    if (!look) {
      return NextResponse.json({ error: 'Look not found' }, { status: 404 });
    }

    return NextResponse.json(look);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch look' }, { status: 500 });
  }
}