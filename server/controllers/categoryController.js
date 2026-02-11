const Category = require('../models/Category');
const slugify = require('slugify');

exports.create = async (req, res) => {
	try {
		const { name } = req.body;
		const category = await Category.create({
			name: name,
			slug: slugify(name, { lower: true }),
		});
		res.json(category);

	} catch (err) {
		res.status(400).send('Create category failed');
	}
};

exports.list = async (req, res) => {
	try {
		const categories = await Category.find({}).sort({ createdAt: -1 });
		res.json(categories);

	} catch (err) {
		res.status(400).send('List categories failed');
	}
};

exports.read = async (req, res) => {
	try {
		const category = await Category.findOne({ slug: req.params.slug });
		res.json(category);

	} catch (err) {
		res.status(400).send('Read category failed');
	}
};

exports.update = async (req, res) => {
	try {
		const { name } = req.body;
		const { slug } = req.params;
		const updated = await Category.findOneAndUpdate(
			{ slug: slug },
			{ name: name, slug: slugify(name, { lower: true }) },
			{ new: true }
		);
		res.json(updated);

	} catch (err) {
		res.status(400).send('Update category failed');
	}
};

exports.delete = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
		res.json(deleted);

	} catch (err) {
		res.status(400).send('Delete category failed');
	}
};