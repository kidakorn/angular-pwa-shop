const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/orders', auth, createOrder);
router.get('/user-orders', auth, getUserOrders);

module.exports = router;