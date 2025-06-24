import mongoose, { Schema, models, model } from "mongoose";

const LookSchema = new Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    segment: { type: String, enum: ["economy", "middle", "luxury"], default: "middle" },
    items: [
      {
        name: String,
        url: String,
        price: Number,
        brand: String,
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const LookModel = models.Look || model("Look", LookSchema);

export default LookModel;