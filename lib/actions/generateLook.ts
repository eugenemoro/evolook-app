'use server';
import { connectMongo } from '@/lib/mongo';
import { LookModel } from '@/lib/models/LookModel';
import { LookDb } from '@/types/Look';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser } from '@/lib/auth';

// Мок-данные для генерации образа
const generateMockLook = (): Omit<LookDb, '_id' | 'user'> => {
  const segments = ['luxury', 'mid', 'economy'] as const;
  const segment = segments[Math.floor(Math.random() * segments.length)];

  return {
    title: `Generated Look #${Math.floor(Math.random() * 1000)}`,
    brand: 'AI Stylist',
    segment,
    imageUrl: `https://placehold.co/600x800?text=Look+${uuidv4().slice(0, 4)}`,
    items: [
      {
        name: 'Generated Jacket',
        brand: 'BrandX',
        type: 'jacket',
        url: 'https://example.com/jacket',
      },
      {
        name: 'Generated Pants',
        brand: 'BrandY',
        type: 'pants',
        url: 'https://example.com/pants',
      },
      {
        name: 'Generated Shoes',
        brand: 'BrandZ',
        type: 'shoes',
        url: 'https://example.com/shoes',
      },
    ],
  };
};

export async function generateLook(): Promise<LookDb> {
  await connectMongo();

  const user = await getCurrentUser();
  const lookData = generateMockLook();

  const look = await LookModel.create({
    ...lookData,
    user: {
      email: user?.email || null,
    },
  });

  return JSON.parse(JSON.stringify(look));
}