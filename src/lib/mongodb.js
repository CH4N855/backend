import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'portfolio' });
  isConnected = true;
  console.log('✅ MongoDB connected');
}
