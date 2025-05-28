import Course from "../models/courseModel.js";

export const addCourse = async (req, res) => {
    try {
        const { courseId, courseName, courseType, institute } = req.body;

        const existingCourse = await Course.findOne({ courseId: courseId });
        if (existingCourse) {
            return res.status(400).json({ message: "Course with this ID already exists" });
        }

        const newCourse = new Course({ courseId, courseName, courseType, institute });
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
