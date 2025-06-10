import LecturePlan from '../models/lecturePlanModel.js';

export const getLecturePlanByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const plan = await LecturePlan.findOne({ courseId });
    if (!plan) {
      return res.status(404).json({ message: "Lecture plan not found" });
    }
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lecture plan', error: err.message });
  }
};
