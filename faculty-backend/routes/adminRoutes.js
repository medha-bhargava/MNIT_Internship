import { Router } from 'express';
import multer from 'multer';
const router = Router();
import { getProfile, updateProfile } from '../controllers/adminController.js';
import { uploadProfilePhoto, uploadCV } from '../controllers/adminController.js';

const upload = multer({ dest: 'uploads/' }); // or configure storage if needed

router.get('/profile', getProfile);
router.put('/profile/update', updateProfile);
router.post('/profile/photo', upload.single('photo'), uploadProfilePhoto);
router.post('/upload-cv', upload.single('cv'), uploadCV);


export default router;
