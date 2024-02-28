import User from '../models/User.js';
import mongoose from 'mongoose';
import Resource from './../models/Resource.js';
import fs from 'fs';
import { uploader, cloudinary } from '../utils/cloudinary.js';
import {
	getPaginatedPayload,
	resourcesSearchConditions,
} from './../utils/getPaginatedPayload.js';
export const getResources = async (req, res) => {
	const page = +(req.query.page || 1);
	const limit = +(req.query.limit || 10);
	const query = req.query.query?.toLowerCase(); // search query
	const inc = req.query.inc?.split(','); // only include fields mentioned in this query

	try {
		let filter;

		if (query) {
			const searchConditions = resourcesSearchConditions(query);
			filter = { ...filter, ...searchConditions };
		}

		const options = {
			lean: true,
			skip: (page - 1) * limit,
			limit: limit,
			select: inc,
		};

		const resources = await Resource.find(filter, null, options);
		const totalItems = await Resource.countDocuments(filter);

		res.status(200).json({
			data: getPaginatedPayload(resources, page, limit, totalItems),
			message: 'Resources fetched successfully',
			success: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Failed to fetch resources', success: false });
	}
};
export const getResource = async (req, res) => {
	const { id } = req.params;
	try {
		const resource = await Resource.findById(id);
		res.status(200).json(resource);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const addResource = async (req, res) => {
	const id = req.user._id;
	const { category, title, description } = req.body;
	try {
		if (!id || !mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid user' });
		}
		if (!req.file) {
			throw new ApiError(400, 'Resource file is required');
		}
		const file = await uploader(req.file.path, 'resource');
		const resource = await Resource.create({
			category,
			title,
			description,
			file,
			userId: id,
		});
		await fs.promises.unlink(req.file.path);
		res.status(200).json({ resource, message: 'Resource added successfully' });
	} catch (error) {
		console.log(error);
		await fs.promises.unlink(req.file.path);
		res.status(500).json({ message: 'server error' });
	}
};
export const deleteResource = async (req, res) => {
	const { id } = req.params;
	try {
		const resource = await Resource.findOneAndDelete({ id });
		res.status(200).json(resource);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
