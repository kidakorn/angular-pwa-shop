const express = require('express');
const router = express.Router();
const { create, update, remove, list, read } = require('../controllers/productController');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

router.post('/product', auth, adminCheck, create);
router.get('/products', list);
router.get('/product/:slug', read);
router.put('/product/:slug', auth, adminCheck, update);
router.delete('/product/:slug', auth, adminCheck, remove);

module.exports = router;