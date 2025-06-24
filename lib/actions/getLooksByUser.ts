import { connectMongo } from '../mongo';
import { LookModel } from '@/lib/models/LookModel';
import { getCurrentUser } from '../auth';
import { LookDb } from '@/types/Look';

export async function getLooksByUser(): Promise<LookDb[]> {
  await connectMongo();
  const user = await getCurrentUser();
  if (!user?.email) return [];

  const looks = await LookModel.find({ 'user.email': user.email })
    .sort({ createdAt: -1 })
    .lean<LookDb[]>();

  return looks;
}