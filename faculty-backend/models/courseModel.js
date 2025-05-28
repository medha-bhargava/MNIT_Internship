import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  courseId: { type: String, required: true, unique: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  courseType: { type: String, enum: ['Currently Teaching', 'Previously Taught'], required: true },
  institute: { type: String, required: true, trim: true }
});

const Course = model('Course', courseSchema);

export default Course;
