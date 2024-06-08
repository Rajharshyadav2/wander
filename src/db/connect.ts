import mongoose from 'mongoose';

const connectDB = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Failed to connect Database');
  }
};

export default connectDB;
