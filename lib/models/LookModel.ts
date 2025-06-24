import mongoose, { Schema } from 'mongoose';
import { LookDb } from '@/types/Look';

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const LookSchema = new Schema<LookDb>(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    segment: {
      type: String,
      enum: ['luxury', 'mid', 'economy'],
      required: true,
    },
    imageUrl: { type: String, required: true },
    items: [ItemSchema],
    user: {
      email: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const LookModel =
  mongoose.models.Look || mongoose.model<LookDb>('Look', LookSchema);