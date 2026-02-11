const express = require('express');
const router = express.Router();
const { create, list, read, update, delete: remove } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

router.post('/category', auth, adminCheck, create);
router.put('/category/:slug', auth, adminCheck, update);
router.delete('/category/:slug', auth, adminCheck, remove);
router.get('/category', list);
router.get('/category/:slug', read);

module.exports = router;