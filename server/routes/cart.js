const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveCart, getCart, emptyCart } = require('../controllers/cartController');

router.post('/cart', auth, saveCart);
router.get('/cart', auth, getCart);
router.delete('/cart', auth, emptyCart);

module.exports = router;