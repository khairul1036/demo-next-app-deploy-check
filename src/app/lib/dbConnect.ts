import mongoose from 'mongoose';

// Create a global connection interface
interface ConnectionObject {
  isConnected: number;
}

// Use a global cache to prevent multiple connections
const globalConnection = global as unknown as { mongoose?: ConnectionObject };

async function dbConnect(): Promise<void> {
  // Check if already connected
  if (globalConnection.mongoose?.isConnected) {
    // console.log('🔄 Using existing database connection');
    return;
  }

  // Ensure MongoDB URI is present
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    // console.error('❌ MONGODB_URI is not defined');
    throw new Error('MONGODB_URI must be defined');
  }

  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    // Set the connection state
    globalConnection.mongoose = {
      isConnected: conn.connections[0].readyState
    };

    // console.log('✅ Database connected successfully');
  } catch (error) {
    // console.error('❌ Error connecting to the database:', error);
    throw error;
  }
}

export default dbConnect;