import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  lectureNo: String,
  date: String,
  title: String,
  pdfLink: String,
  pptLink: String
});

const lecturePlanSchema = new mongoose.Schema({
  courseId: String,
//   year: String, // optional — if you still want to distinguish per year
  lecturePlan: [lectureSchema]
});

export default mongoose.model('LecturePlan', lecturePlanSchema);
