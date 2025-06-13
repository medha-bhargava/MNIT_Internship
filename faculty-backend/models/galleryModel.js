import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  category: { type: String, required: false}, // e.g., Photography, Music, Dance
  date: { type: Date },
});

export default mongoose.model("Gallery", gallerySchema);
