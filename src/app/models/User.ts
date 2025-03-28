import mongoose from 'mongoose';

// Define TypeScript interface for User
export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  age?: number;
  createdAt?: Date;
}

// Create Mongoose Schema
const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot be more than 120']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create or retrieve the model
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);