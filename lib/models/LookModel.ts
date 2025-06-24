// lib/models/LookModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Item {
  name: string;
  brand: string;
  type: string;
  url: string;
}

export interface LookDb extends Document {
  title: string;
  brand: string;
  segment: 'economy' | 'mid' | 'luxury';
  imageUrl: string;
  items: Item[];
}

const ItemSchema = new Schema<Item>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const LookSchema = new Schema<LookDb>({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  segment: { type: String, enum: ['economy', 'mid', 'luxury'], required: true },
  imageUrl: { type: String, required: true },
  items: { type: [ItemSchema], required: true },
});

export const LookModel =
  mongoose.models.Look || mongoose.model<LookDb>('Look', LookSchema);