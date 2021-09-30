var express = require("express");
var router = express.Router();
let teamCtrl = require("../controllers/teams");

/* GET users listing. */
router.get("/", teamCtrl.index);
router.get("/:id", teamCtrl.show);
router.post("/", teamCtrl.create);
router.delete("/:id", teamCtrl.delete);
router.put("/:id", teamCtrl.update);

module.exports = router;
