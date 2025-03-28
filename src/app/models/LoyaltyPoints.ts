import mongoose, { Schema, Document } from 'mongoose';

export interface ILoyaltyPoints extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  history: { action: string; points: number; date: Date }[];
  createdAt?: Date;
}

const LoyaltyPointsSchema = new Schema<ILoyaltyPoints>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, default: 0 },
  history: [
    {
      action: { type: String, required: true },
      points: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.LoyaltyPoints || mongoose.model<ILoyaltyPoints>('LoyaltyPoints', LoyaltyPointsSchema);
