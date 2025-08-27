import mongoose from "mongoose";
import { randomUUID } from "crypto";

// Mongoose schema for individual chat messages
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

// Mongoose schema for user accounts with embedded chats
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema],

});

export default mongoose.model("User", userSchema);