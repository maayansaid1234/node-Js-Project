import express from "express";
import shoeRouter from "./routes/shoe.js"
import userRouter from "./routes/user.js"
import orderRouter from "./routes/order.js"
import { connectToDB } from "./db/connectToDb.js"
import { config } from "dotenv";
import cors from "cors";
import { errorHandling } from "./middlwares/errorHandling.js";


const app = express();

connectToDB();
config();

app.use(cors())
app.use(express.json());
app.use("/api/shoe", shoeRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use(errorHandling)

let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
