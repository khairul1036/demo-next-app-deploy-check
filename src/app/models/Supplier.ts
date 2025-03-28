import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  contactEmail: string;
  phone: string;
  address: string;
  createdAt?: Date;
}

const SupplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true, trim: true },
  contactEmail: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Supplier || mongoose.model<ISupplier>('Supplier', SupplierSchema);
