const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
		text: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	soldCount: {
		type: Number,
		default: 0,
	},
	stock: {
		type: Number,
	},
	images: {
		type: Array,
	},
	slug: {
		type: String,
		unique: true,
		lowercase: true,
	},
	category: {
		type: ObjectId,
		ref: 'Category',
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Product', productSchema);