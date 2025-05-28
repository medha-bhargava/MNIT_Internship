import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
    pId: { type: String, required: true, unique: true },
    pType: { type: String, required: true },
    pTitle: { type: String, required: true },
    pAuthors: { type: [String], required: true },
    pVenue: { type: String, required: true },
    pDate: { type: Date, required: true },
});

export default model("Publication", publicationSchema)