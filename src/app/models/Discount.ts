import mongoose, { Schema, Document } from 'mongoose';

// Interface for Discount Code
export interface IDiscount extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  amount: number;
  expiresAt: Date;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
  createdAt?: Date;
}

// Discount Schema
const DiscountSchema = new Schema<IDiscount>({
  code: { type: String, required: true, unique: true, trim: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  amount: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
  usageLimit: { type: Number, required: true },
  usageCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Export Model
export default mongoose.models.Discount || mongoose.model<IDiscount>('Discount', DiscountSchema);
