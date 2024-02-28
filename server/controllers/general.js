import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Resource from '../models/Resource.js';

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getDashboardStats = async (req, res) => {
	try {
		const transactions = await Transaction.find()
			.limit(50)
			.sort({ createdOn: -1 });

		const topCustomers = await User.find({ role: 'USER' })
			.limit(5)
			.sort({ createdOn: -1 });
		const totalUsers = await User.countDocuments();
		const totalCustomers = await User.countDocuments({ role: 'USER' });
		const totalAdmins = await User.countDocuments({ role: 'ADMIN' });
		const totalResources = await Resource.countDocuments({ role: 'ADMIN' });

		res.status(200).json({
			totalUsers,
			totalCustomers,
			topCustomers,
			totalAdmins,
			totalResources,
			transactions,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
