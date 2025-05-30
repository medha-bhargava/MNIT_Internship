import { Router } from 'express';
const router = Router();
import { getProfile, updateProfile } from '../controllers/adminController.js';

router.get('/profile', getProfile);
router.put('/profile/update', updateProfile);

export default router;
