import mongoose from "mongoose";
import { speakerSchema } from "./course.js";
const minimalCourseSchema = mongoose.Schema({
    name: String,
    price: Number,
    speaker: speakerSchema
})

const userSchema = mongoose.Schema({
   
    userName: String,
    password: String,
    email: { type: String, unique: true },
    courses: [minimalCourseSchema]
})

export const userModel = mongoose.model("users", userSchema)