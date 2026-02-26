const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema({
	orderedBy: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	products: [
		{
			product: {
				type: ObjectId,
				ref: 'Product',
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				default: 1
			}
		}
	]
}, { timeseries: true });

module.exports = mongoose.model('Cart', cartSchema);