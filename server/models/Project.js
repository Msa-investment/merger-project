import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: String,
		description: String,
		type: String,
		status: String,
		startDate: {
			type: Date,
			require: true,
		},
		endDate: {
			type: Date,
			require: true,
		},
	},
	{ timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
