const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");
const authToken = require("../../config/auth");

// POST /api/users/signup
router.post("/signup", usersCtrl.create);
// POST /api/users/login
router.post("/login", usersCtrl.login);

//use the auth code as a middleware before the route used to send a response back after checking verification
router.get("/verify", authToken, usersCtrl.verify);

module.exports = router;
