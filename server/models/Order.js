const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

	items: [{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		quantity: { type: Number, required: true, min: 1 },
		price: { type: Number, required: true },
	}],

	totalAmount: { type: Number, required: true },
	status: { type: String, enum: ['pending', 'paid', 'shipped', 'cancelled'], default: 'pending' },

	shippingAddress: {
		name: { type: String, required: true },
		phone: { type: String, required: true },
		addressDetail: { type: String, required: true },
		subDistrict: { type: String, required: true },
		district: { type: String, required: true },
		province: { type: String, required: true },
		postalCode: { type: String, required: true }
	},

	paymentDetails: {
		method: { type: String, required: true },
		status: { type: String, default: 'pending' }
	}

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);