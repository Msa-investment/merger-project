import mongoose, { Schema } from 'mongoose';

const ActivitySchema = new mongoose.Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
		name: String,
		type: String,
		role: String,
		description: String,
		status: {
			type: String,
			default: 'SCHEDULED',
			required: true,
			enum: [
				'SCHEDULED',
				'START',
				'ONGOING',
				'COMPLETED',
				'INCOMPLETED',
				'CANCELED',
			],
		},
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

const Activity = mongoose.model('Activity', ActivitySchema);
export default Activity;
