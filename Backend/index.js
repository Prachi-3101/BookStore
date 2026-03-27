import express from "express";
import dotenv from "dotenv";
const app = express();
import mongoose from "mongoose";
import connectDB from "./src/db/index.js";

dotenv.config({
    path: './env'
});

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;



app.listen(PORT,() => {
    console.log(`server is listening on port ${PORT}`);
})