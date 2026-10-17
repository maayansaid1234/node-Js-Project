import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        if (!process.env.DB_URI) {
            throw new Error("DB_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.DB_URI);
        console.log("mongo db connected");
    }
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1);
    }
}