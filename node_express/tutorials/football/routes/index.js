var express = require("express");
var router = express.Router();
let ctrl = require("../controllers/index");
let uploadCtrl = require("../controllers/upload");

/* GET home page. */
router.get("/", ctrl.index);
router.post("/upload", uploadCtrl.upload);

module.exports = router;
