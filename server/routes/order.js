const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/orders', auth, createOrder);

module.exports = router;