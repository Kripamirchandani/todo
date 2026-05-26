import mongoose from "mongoose";

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("DB Error:", error);
        throw error;
    }
};