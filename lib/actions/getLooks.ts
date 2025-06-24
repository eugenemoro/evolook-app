import mongoose from "mongoose";
import { LookModel } from "../models/LookModel";
import type { LookDb } from "@/types/Look";
import { connectMongo } from "../mongo";

// Подключение к MongoDB
export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

// Получить все образы (главная)
export async function getAllLooks(segment?: 'luxury' | 'mid' | 'economy') {
  try {
    await connectMongo();

    const filter = segment ? { segment } : {};
    const looks = await LookModel.find(filter)
      .sort({ createdAt: -1 })
      .lean<LookDb[]>();
    return looks.map((look) => ({
      ...look,
      _id: look._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching looks:', error);
    return [];
  }
}

// Получить образ по ID
export async function getLookById(id: string) {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.warn("Invalid ObjectId:", id);
    return null;
  }

  try {
    const look = await LookModel.findById(id).lean<LookDb>();
    if (!look) return null;

    return {
      _id: look._id.toString(),
      title: look.title,
      brand: look.brand,
      segment: look.segment,
      imageUrl: look.imageUrl,
      items: look.items || [],
    };
  } catch (err) {
    console.error("Error fetching look by ID:", err);
    return null;
  }
}

// Фильтрация по сегменту (luxury/mid/economy)
export async function getLooksBySegment(segment: "luxury" | "mid" | "economy") {
  await connectToDatabase();

  try {
    const looks = await LookModel.find({ segment })
      .sort({ createdAt: -1 })
      .lean<LookDb[]>();

    return looks.map((look) => ({
      _id: look._id.toString(),
      title: look.title,
      brand: look.brand,
      segment: look.segment,
      imageUrl: look.imageUrl,
      items: look.items || [],
    }));
  } catch (error) {
    console.error(`Error fetching looks for segment "${segment}":`, error);
    return [];
  }
}