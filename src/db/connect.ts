import mongoose from 'mongoose';

const connectDB = async (url: string): Promise<any> => {
  try {
    console.log('Database connected successfully');
    return await mongoose.connect(url);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Failed to connect Database');
  }
};

export default connectDB;
