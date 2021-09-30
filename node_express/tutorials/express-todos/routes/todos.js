var express = require("express");
var router = express.Router();
const todoCtrl = require("../controllers/todos");

/* GET users listing. */

router.get("/", todoCtrl.index);
router.get("/:id", todoCtrl.show);

module.exports = router;
