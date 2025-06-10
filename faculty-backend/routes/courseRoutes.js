import { Router } from 'express';
const router = Router();

import { 
  addCourse, 
  getAllCourses, 
  getCourseById, 
  addYearToCourse,
  addLecturePlan
} from '../controllers/courseController.js';
import { getLecturePlanByCourseAndYear } from '../controllers/lecturePlanController.js';

router.post('/add', addCourse);
router.get('/all', getAllCourses);
router.get('/:courseId', getCourseById);
router.post('/add-year', addYearToCourse);
router.post('/add-lecture-plan/:courseId/', addLecturePlan);
router.get('/:courseId/:year', getLecturePlanByCourseAndYear);

export default router;
