const Product = require('../models/Product');
const slugify = require('slugify');

exports.create = async (req, res) => {
	try {
		const { title, description, price, soldCount, stock, images, category } = req.body;
		const product = await Product.create({
			title: title,
			description: description,
			price: price,
			soldCount: soldCount,
			stock: stock,
			images: images,
			slug: slugify(title, { lower: true }),
			category: category,
		});
		res.json(product);

	} catch (err) {
		res.status(400).send('Create product failed');
	}
};

exports.list = async (req, res) => {
	try {
		const products = await Product.find({})
			.populate('category')
			.sort({ createdAt: -1 });
		res.json(products);

	} catch (err) {
		res.status(400).send('List products failed');
	}
};

exports.read = async (req, res) => {
	try {
		const product = await Product.findOne({ slug: req.params.slug })
			.populate('category');
		res.json(product);

	} catch (err) {
		res.status(400).send('Read product failed');
	}
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
		res.json(deleted);

	} catch (err) {
		res.status(400).send('Delete product failed');
	}
};

exports.update = async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title, { lower: true });
		}

		const updated = await Product.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true }
		).populate('category');

		res.json(updated);

	} catch (err) {
		res.status(400).send('Update product failed');
	}
};