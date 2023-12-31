import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const mongoUrl = process.env.MONGODB_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log("MongoDb connected successfully")
    } catch (err) {
        console.error(err);
    }
}
connectDb();