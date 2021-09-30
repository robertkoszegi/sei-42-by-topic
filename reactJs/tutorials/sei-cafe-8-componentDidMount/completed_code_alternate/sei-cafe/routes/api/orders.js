// routes/api/orders.js

const express = require('express');
const router = express.Router();
const orderCtrl = require('../../controllers/orders');

// POST new order. Full address will be 
router.post('/', orderCtrl.create)

module.exports = router;