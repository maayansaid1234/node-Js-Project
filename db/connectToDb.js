import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
      //  let connect = await mongoose.connect(process.env.DB_URI||"mongodb://0.0.0.0:27017/shoesDB")
        let connect = await mongoose.connect(process.env.DB_URI||"mongodb+srv://maayansaid1234:WhtkU1ISxWXpvrUR@shoesdb.7bfqoig.mongodb.net/")
        console.log("mongo db connected")
    }
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1)
    }
}