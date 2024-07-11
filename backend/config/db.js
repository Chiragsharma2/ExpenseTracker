import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); //Load Environment Variables

const uri = process.env.MONGODB_URI;

if(!uri) {
    console.error('MONGODB_URI is not defined in the environment variables')
    process.exit(1);
}

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
}
export default connectDB; 