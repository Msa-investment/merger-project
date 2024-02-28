import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
// import { validate } from '../validators/validate.js';
import { upload } from '../middleware/multer.js';
import {
	addResource,
	getResources,
	getResource,
	deleteResource,
} from '../controllers/resource.js';

const router = express.Router();
router.get('/', requireAuth, getResources);
router.get('/:id', requireAuth, getResource);
router.post('/', requireAuth, upload.single('file'), addResource);
router.delete('/:id', requireAuth, deleteResource);
export default router;
