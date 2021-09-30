// routes/api/orders.js

const express = require('express');
const router = express.Router();
const orderCtrl = require('../../controllers/orders');

// this auth will DECODE the frontend's token
// and generate a magic variable called REQ.USER
// it will work for all routes AFTER this line
router.use(require('../../config/auth'));

// POST new order. Full address will be POST /api/orders
router.post('/', orderCtrl.create)
// GET /api/orders
router.get('/', orderCtrl.index)

module.exports = router;