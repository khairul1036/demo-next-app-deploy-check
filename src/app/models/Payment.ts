import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface
interface Payment extends Document {
  id: string;
  customerName: string;
  customerEmail: string;
  customerLocation: string;
  paybill: number;
  due: number;
  status: string;
  trxId: string;
  paymentMethod: string;
  paymentDate: Date;
}
// Define the schema
const PaymentSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerLocation: { type: String, required: true },
    paybill: { type: Number, required: true },
    due: { type: Number, required: true },
    status: { type: String, required: true },
    trxId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// Create the model
const PaymentModel =
  mongoose.models.Payment || mongoose.model<Payment>("Payment", PaymentSchema);

export default PaymentModel;
