const express = require("express");
const router = express.Router();
const itemCtrl = require("../../controllers/items");

// POST new order. Full address will be
router.get("/items", itemCtrl.itemsIndex);
router.get("/categories", itemCtrl.catsIndex);

module.exports = router;
