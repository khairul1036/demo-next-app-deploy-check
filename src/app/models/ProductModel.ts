// models/ProductModel.ts
import mongoose from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock quantity cannot be negative']
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Prevent model re-compilation
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);