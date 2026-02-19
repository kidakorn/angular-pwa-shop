const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
	try {
		const { items, shippingAddress, paymentDetails } = req.body;
		console.log('ข้อมูลผู้ใช้ที่แกะจาก Token:', req.user);
		const userId = req.user._id || req.user.id;

		let calculatedTotal = 0;
		let finalItems = [];

		for (let item of items) {
			const product = await Product.findById(item.productId);

			if(product) {
				calculatedTotal += ( product.price * item.quantity );

				finalItems.push({
					productId: product._id,
					quantity: item.quantity,
					price: product.price,
				});
			}
		}

		const order = await Order.create({
			userId: userId,
			items: finalItems,
			totalAmount: calculatedTotal,
			shippingAddress: shippingAddress,
			paymentDetails: paymentDetails,
		});

		res.json(order);

	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Create order failed' });
	}
};