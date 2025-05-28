import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], required: true }
});

export default model("User", userSchema);