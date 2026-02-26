const Cart = require('../models/Cart');
const catchAsync = require('../utils/catchAsync');

exports.saveCart = catchAsync(async (req, res) => {
	const { cartItems } = req.body;
	const userId = req.user._id || req.user.id;

	let cartExistByThisUser = await Cart.findOne({ orderedBy: userId });

	if (cartExistByThisUser) {
		cartExistByThisUser.products = cartItems;
		await cartExistByThisUser.save();
		return res.json({ msg: 'Cart updated successfully', cart: cartExistByThisUser });
	}

	const newCart = await new Cart({
		products: cartItems,
		orderedBy: userId,
	}).save();

	res.json({ msg: 'Cart created successfully', cart: newCart });
});

exports.getCart = catchAsync(async (req, res) => {
	const userId = req.user._id || req.user.id;

	const cart = await Cart.findOne({ orderedBy: userId }).populate('products.product');

	res.json(cart);
});

exports.emptyCart = catchAsync(async (req, res) => {
	const userId = req.user._id || req.user.id;

	await Cart.findOneAndDelete({ orderedBy: userId });

	res.json({ msg: 'Cart has been emptied' });
});
