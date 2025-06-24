'use server';

import { connectMongo } from '../mongo';
import { LookModel } from '@/lib/models/LookModel';
import { LookDb } from '@/types/Look';

export async function getLooksByUser(
  email: string,
  segment?: 'luxury' | 'mid' | 'economy'
): Promise<LookDb[]> {
  await connectMongo();
  const filter: any = { 'user.email': email };
  if (segment) filter.segment = segment;

  const looks = await LookModel.find(filter)
    .sort({ createdAt: -1 })
    .lean<LookDb[]>();

  return looks;
}