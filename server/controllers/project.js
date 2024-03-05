import Project from '../models/Project.js';
import Activity from '../models/Activity.js';
import {
	getPaginatedPayload,
	projectsSearchConditions,
} from './../utils/getPaginatedPayload.js';
export const getProjects = async (req, res) => {
	const page = +(req.query.page || 1);
	const limit = +(req.query.limit || 10);
	const query = req.query.query?.toLowerCase(); // search query
	const inc = req.query.inc?.split(','); // only include fields mentioned in this query

	try {
		let filter;

		if (query) {
			const searchConditions = projectsSearchConditions(query);
			filter = { ...filter, ...searchConditions };
		}

		const options = {
			lean: true,
			skip: (page - 1) * limit,
			limit: limit,
			select: inc,
		};

		const projects = await Project.find(filter, null, options);
		const totalItems = await Project.countDocuments(filter);

		res.status(200).json({
			data: getPaginatedPayload(projects, page, limit, totalItems),
			message: 'Projects fetched successfully',
			success: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Failed to fetch projects', success: false });
	}
};

export const createProject = async (req, res) => {
	try {
		// const { activities } = req.body;
		const project = await Project.create({ userId: req.user._id, ...req.body });
		// if (activities) {
		// 	await Promise.all(
		// 		activities.map((activity) => {
		// 			return Activity.create({ project: project._id, ...activity });
		// 		})
		// 	);
		// }
		// const findActivities = Activity.find({ project: project._id });
		console.log(project);
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getProject = async (req, res) => {
	try {
		const { id } = req.params;
		const project = await Project.findById(id);
		const activities = await Activity.find({ project: id });
		res.status(200).json({ project, activities });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const getMyActivity = async (req, res) => {
	try {
		const id = req.user._id;
		const activities = await Activity.find({ role: id });
		res.status(200).json(activities);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const getActivity = async (req, res) => {
	try {
		const { id, activityId } = req.params;
		const activity = await Activity.findById(activityId);
		const project = await Project.findOne({ id }).populate('userId', [
			'avatar',
			'firstName',
			'lastName',
			'role',
			'phone',
		]);
		res.status(200).json({ activity, project });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const addActivity = async (req, res) => {
	try {
		const { id } = req.params;
		const project = await Project.findOne({ id });
		if (!project) {
			return res.status(401).json({ message: 'Invalid project' });
		}
		const activity = await Activity.create(req.body);
		res.status(200).json(activity);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const updateActivity = async (req, res) => {
	try {
		const { id } = req.params;
		const isActivity = await Activity.findById(id);
		if (!isActivity) {
			return res.status(401).json({ message: 'Invalid project' });
		}
		const activity = await Activity.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true }
		);
		res.status(200).json(activity);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const updateActivityStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const isActivity = await Activity.findById(id);
		if (!isActivity) {
			return res.status(401).json({ message: 'Invalid project' });
		}
		const activity = await Activity.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);
		res.status(200).json(activity);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const updateProject = async (req, res) => {
	try {
		const { id } = req.params;
		const project = await Project.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true }
		);
		res.status(200).json(project);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const deleteActivity = async (req, res) => {
	try {
		const { id, activityId } = req.params;
		const userId = req.user._id;

		// Check if the project exists and the user has permission
		const project = await Project.findById(id);
		if (
			!project ||
			(req.user.role !== 'ADMIN' &&
				project.userId.toString() !== userId.toString())
		) {
			return res
				.status(403)
				.json({ message: 'Unauthorized to delete activity' });
		}

		// Check if the activity exists
		const activity = await Activity.findById(activityId);
		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}

		// Delete the activity
		await activity.remove();

		// Return success response
		res.status(200).json({ message: 'Activity deleted successfully' });
	} catch (error) {
		// Handle errors
		res.status(500).json({ message: 'Internal server error' });
	}
};
export const deleteProject = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user._id;

		// Check if the project exists and the user has permission
		const project = await Project.findById(id);
		if (
			!project ||
			(req.user.role !== 'ADMIN' &&
				project.userId.toString() !== userId.toString())
		) {
			return res
				.status(403)
				.json({ message: 'Unauthorized to delete activity' });
		}
		await Project.remove();
		res.status(200).json({ message: 'Project deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
