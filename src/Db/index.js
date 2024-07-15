import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("connected to DB");
    } catch (error) {
        console.log('failed to connect to DB', error);
        process.exit(1);
    }
}

export default connectDB;