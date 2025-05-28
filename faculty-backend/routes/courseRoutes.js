import { Router } from 'express';
const router = Router();
import { addCourse, getAllCourses } from '../controllers/courseController.js';

router.post('/add', addCourse);
router.get('/all', getAllCourses);

export default router;
