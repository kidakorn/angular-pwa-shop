const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
	try {
		const { items, shippingAddress, paymentDetails } = req.body;
		// ดึง userId จาก Token (ตามที่เราแก้กันไปเมื่อวาน)
		const userId = req.user._id || req.user.id;

		let calculatedTotal = 0;
		let finalItems = [];

		for (let item of items) {
			const product = await Product.findById(item.productId);

			if (product) {
				if (product.stock < item.quantity) {
					return res.status(400).json({
						error: `ขออภัย สินค้า "${product.title}" มีจำนวนไม่พอ (เหลือเพียง ${product.quantity} ชิ้น)`
					});
				}

				calculatedTotal += (product.price * item.quantity);

				finalItems.push({
					productId: product._id,
					quantity: item.quantity,
					price: product.price,
				});

				product.stock -= item.quantity;
				
				product.soldCount += item.quantity;

				await product.save();
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