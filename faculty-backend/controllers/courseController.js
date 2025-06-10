import Course from "../models/courseModel.js";
import LecturePlan from "../models/lecturePlanModel.js";

export const addCourse = async (req, res) => {
  try {
    const { courseId, courseName, courseType, institute, yearsTaught, description } = req.body;

    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
      return res.status(400).json({ message: "Course with this ID already exists" });
    }

    const newCourse = new Course({
      courseId,
      courseName,
      courseType,
      institute,
      description,
      yearsTaught
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: 'Error adding course', error: err.message });
  }
};

// export const addLecturePlan = async (req, res) => {
//   const { courseId, year } = req.params;
//   const { courseId: bodyCourseId, year: bodyYear, yearEntry } = req.body;

//   try {
//     const course = await Course.findOne({ courseId: courseId });

//     if (!course) return res.status(404).json({ message: 'Course not found' });

//     // Check if year entry already exists
//     // const existing = course.yearsTaught.find(y => y.year === year);
//     // if (existing) return res.status(400).json({ message: 'Lecture plan already exists for this year' });
//     const yearBlock = course.yearsTaught.find((entry) => entry.year === year);

//     if (!yearBlock) {
//       return res.status(404).json({ message: 'Year not found for this course' });
//     }

//     yearBlock.lecturePlan.push(...yearEntry.lecturePlan);
//     await course.save();

//     res.status(200).json({ message: 'Lecture plan added successfully!' });


//     course.yearsTaught.push({
//       year,
//       session: yearEntry.session,
//       syllabusLink: yearEntry.syllabusLink,
//       classroomLink: yearEntry.classroomLink,
//       lecturePlan: yearEntry.lecturePlan
//     });

//     await course.save();

//     res.status(200).json({ message: 'Lecture plan added successfully!' });

//   } catch (err) {
//     console.error('❌ Server Error:', err);
//     res.status(500).json({ message: 'Server error while adding lecture plan' });
//   }
// };


// export const addLecturePlan = async (req, res) => {
//   const { courseId } = req.params;
//   const { yearEntry } = req.body;

//   try {
//     const existingPlan = await LecturePlan.findOne({ courseId });

//     if (existingPlan) {
//       // Update lecture plan (overwrite)
//       // existingPlan.session = yearEntry.session;
//       existingPlan.syllabusLink = yearEntry.syllabusLink;
//       existingPlan.classroomLink = yearEntry.classroomLink;
//       existingPlan.lecturePlan = yearEntry.lecturePlan;
//       await existingPlan.save();
//       return res.status(200).json({ message: "Lecture plan updated successfully!" });
//     }

//     // Create new entry
//     const newPlan = new LecturePlan({
//       courseId,
//       // session: yearEntry.session,
//       syllabusLink: yearEntry.syllabusLink,
//       classroomLink: yearEntry.classroomLink,
//       lecturePlan: yearEntry.lecturePlan
//     });

//     await newPlan.save();
//     res.status(200).json({ message: "Lecture plan added successfully!" });

//   } catch (err) {
//     console.error("❌ Server Error:", err);
//     res.status(500).json({ message: "Server error while adding lecture plan" });
//   }
// };

export const addLecturePlan = async (req, res) => {
  const { courseId } = req.params;
  const { yearEntry } = req.body;

  if (!yearEntry || !yearEntry.lecturePlan) {
    return res.status(400).json({ message: "Missing lecturePlan data in request body" });
  }

  const { lecturePlan } = yearEntry;

  try {
    // Check if lecture plan already exists for the course
    const existingPlan = await LecturePlan.findOne({ courseId });

    if (existingPlan) {
      // Append new lectures to the existing lecture plan
      existingPlan.lecturePlan.push(...lecturePlan);
      await existingPlan.save();
      return res.status(200).json({ message: "Lecture plan updated successfully!" });
    }

    // Create a new lecture plan if none exists
    const newPlan = new LecturePlan({
      courseId,
      lecturePlan
    });

    await newPlan.save();
    res.status(201).json({ message: "Lecture plan added successfully!" });
  } catch (err) {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({ message: "Server error while adding lecture plan", error: err.message });
  }
};



// export const addLecturePlan = async (req, res) => {
//   const { courseId, year } = req.params;
//   const { yearEntry } = req.body;

//   try {
//     const course = await Course.findOne({ courseId });

//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     const yearBlock = course.yearsTaught.find((entry) => entry.year === year);

//     if (!yearBlock) {
//       return res.status(404).json({ message: 'Year not found for this course' });
//     }

//     // Append new lecturePlan entries
//     yearBlock.lecturePlan.push(...yearEntry.lecturePlan);

//     await course.save();
//     res.status(200).json({ message: 'Lecture plan added successfully!' });

//   } catch (err) {
//     console.error('❌ Server Error:', err);
//     res.status(500).json({ message: 'Server error while adding lecture plan' });
//   }
// };


export const addYearToCourse = async (req, res) => {
  try {
    const { courseId, yearEntry } = req.body;

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.yearsTaught.push(yearEntry);
    await course.save();

    res.status(200).json({ message: "Year added successfully", course });
  } catch (err) {
    res.status(500).json({ message: 'Error adding year to course', error: err.message });
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

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course", error: err.message });
  }
};
