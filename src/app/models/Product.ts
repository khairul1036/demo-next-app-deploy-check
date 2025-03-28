
import mongoose, { Schema, Document, model } from "mongoose";
// Define TypeScript interface
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  warranty: string;
  return_policy: string;
}
// Define Mongoose schema with validation
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, max: 100 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, required: true, min: 0 },
    warranty: { type: String, required: true },
    return_policy: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Product ||
  model<IProduct>("Product", ProductSchema);
