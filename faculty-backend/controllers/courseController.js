import Course from "../models/courseModel.js";

export const addCourse = async (req, res) => {
    try {
        const { courseId, courseName, courseType, institute, syllabusLink, classroomLink } = req.body;

        const existingCourse = await Course.findOne({ courseId: courseId });
        if (existingCourse) {
            return res.status(400).json({ message: "Course with this ID already exists" });
        }

        const newCourse = new Course({ courseId, courseName, courseType, institute, syllabusLink, classroomLink });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ message: 'Error adding course', error: err.message });
    }
};


export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err.message });
    }
};

export const getCourseByName = async (req, res) => {
  try {
    const courseName = decodeURIComponent(req.params.courseName);
    const course = await Course.findOne({ courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course", error: err.message });
  }
};

