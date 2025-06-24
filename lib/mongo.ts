import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) throw new Error('Missing MONGODB_URI');
const uri: string = MONGO_URI;

let cached = (global as any).mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: 'evolook',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}