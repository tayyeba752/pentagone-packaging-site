const express = require("express");
const User = require("../controllers/user");
const router = express.Router();

router.post("/signup", User.signup);
router.post("/login", User.login);
router.get("/allUser", User.GetAllUser);



module.exports = router;
