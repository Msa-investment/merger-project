import mongoose, { Schema } from 'mongoose';

const ResourceSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
            type: String,
            required: true
		},
		description: {
            type: String,
            required: true
		},
		category: {
            type: String,
            required: true
		},
		file: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

const Resource = mongoose.model('Resource', ResourceSchema);
export default Resource;
