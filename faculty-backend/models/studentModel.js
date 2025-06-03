import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  sName: { type: String, required: true, },
  sDegree: { type: String, enum: ["PhD", "M.Tech", "MS", "B.Tech"], required: true, },
  sStatus: { type: String, enum: ["Ongoing", "Completed"], required: true, },
  sTitle: { type: String, required: true, },
  sInstitute: { type: String, required: true, },
  sYear: { type: Number, required: true, },
});

export default mongoose.model("Student", studentSchema);
