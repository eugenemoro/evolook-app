import type mongoose from "mongoose";

export type LookDb = {
  _id: string;
  title: string;
  brand: string;
  segment: 'luxury' | 'mid' | 'economy';
  imageUrl: string;
  items?: {
    name: string;
    brand: string;
    type: string;
    url: string;
  }[];
  user?: { email?: string }
};

export interface LookClient {
  _id: string;
  title: string;
  brand: string;
  segment: "luxury" | "mid" | "economy";
  imageUrl: string;
  items: {
    name: string;
    brand: string;
    type: string;
    url: string;
  }[];
}