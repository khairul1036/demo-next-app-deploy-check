import mongoose, { Schema, Document, model } from "mongoose";
// Define TypeScript interface
export interface IOrder extends Document {
  id: string;
  customerName: string;
  customerEmail: string;
  customerLocation: string;
  productName: string;
  productPrice: number;
  totalQuantity: number;
  totalPrice: number;
  category: string;
  brand: string;
  orderDate?: Date;
}
// Define Mongoose schema with validation
const OrderSchema = new Schema<IOrder>(
  {
    id: { type: String, required: true, unique: true },
    customerName: { type: String, required: true, trim: true, minlength: 3 },
    customerEmail: { type: String, required: true, trim: true, minlength: 3 },
    customerLocation: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    productName: { type: String, required: true, trim: true, minlength: 3 },
    productPrice: { type: Number, required: true, min: 0 },
    totalQuantity: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
export default mongoose.models.Order || model<IOrder>("Order", OrderSchema);
