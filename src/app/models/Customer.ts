import mongoose, { Document, Schema } from "mongoose";

// Define Order History Schema
interface IOrder {
  orderId: string;
  amount: number;
  date: Date;
}

// Define TypeScript interface for Customer
export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  location: string;
  preferences: string[];
  orderHistory: IOrder[];
  frequency: number;
  createdAt: Date;
}

// Create Mongoose Schema
const CustomerSchema: Schema<ICustomer> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    preferences: { type: [String], required: true },
    orderHistory: [
      {
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    frequency: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Ensure Mongoose doesn't overwrite model if already created
export default mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);
