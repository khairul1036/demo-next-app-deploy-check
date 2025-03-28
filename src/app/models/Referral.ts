import mongoose, { Schema, Document } from 'mongoose';

export interface IReferral extends Document {
  referrerId: mongoose.Types.ObjectId;
  referredId?: mongoose.Types.ObjectId;
  referralCode: string;
  rewardPoints: number;
  status: 'pending' | 'completed';
  createdAt?: Date;
}

const ReferralSchema = new Schema<IReferral>({
  referrerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referredId: { type: Schema.Types.ObjectId, ref: 'User' },
  referralCode: { type: String, required: true, unique: true },
  rewardPoints: { type: Number, default: 50 },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Referral || mongoose.model<IReferral>('Referral', ReferralSchema);
