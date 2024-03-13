import express from "express";
import mongoose from 'mongoose';
import userRoutes from "./Routes/userRoutes.js";
import { CustomError } from "./CustomErrors/CustomErrors.js";
import errorHandler from "./CustomErrors/ErrorHandler.js";
import cors from 'cors';

// import dotenv from 'dotenv'
// dotenv.config()

const app = express();
const port = process.env.PORT || 3000

app.use(cors({
    origin:"http://localhost:5173/"
}));

app.use(express.json());



app.get("/", (req, res) => {
    res.json({
        msg: "Welllcooome...."
    });
})

app.use("/user", userRoutes);


app.use(errorHandler);

const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI);
        console.log("Db connected...");
    } catch (error) {
        console.log("Db is not connected!!!");
    }
}

connectDb();
// listen for requests
app.listen(port, () => {
    console.log("listening on port", port);
})