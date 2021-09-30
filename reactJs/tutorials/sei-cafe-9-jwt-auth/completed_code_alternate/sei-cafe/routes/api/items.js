// routes/api/items.js

const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/items');

// GET /api/items
router.get('/items', itemsCtrl.itemsIndex)
// GET /api/categories/
router.get('/categories', itemsCtrl.catsIndex)


module.exports = router;