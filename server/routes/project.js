import express from 'express';
const router = express.Router();
import { requireAuth } from '../middleware/requireAuth.js';
import {
	createProject,
	getProjects,
	getProject,
	getActivity,
	addActivity,
	getMyActivity,
	deleteActivity,
	updateActivity,
	updateProject,
	deleteProject,
} from '../controllers/project.js';

// // create Project
router.post('/', requireAuth,  createProject);
// get all Projects
router.get('/', requireAuth, getProjects);
// get Activity
router.get('/activity', requireAuth, getMyActivity);
// get Activity
router.get('/:id/activity', requireAuth, getActivity);
// add Activity
router.post('/:id/activity', requireAuth, addActivity);
// get user Project
router.get('/:id', requireAuth, getProject);
// get update Project
router.patch('/update-project', requireAuth, updateProject);
// get update Activity
router.patch('/update-activity', requireAuth, updateActivity);

router.delete('/', requireAuth, deleteProject);
router.delete('/activity', requireAuth, deleteActivity);

export default router;
