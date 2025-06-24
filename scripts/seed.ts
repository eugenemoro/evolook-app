import { connectMongo } from '../lib/mongo';
import { LookModel } from '../lib/models/LookModel';
import { mockLooks } from './mock/mockLooks';

async function seed() {
  await connectMongo();
  await LookModel.deleteMany({});
  await LookModel.insertMany(mockLooks);
  console.log('✅ Looks seeded successfully');
}

seed();