const express = require("express");
const Email = require("../controllers/email");
const router = express.Router();

router.post("/mailsend", Email.postNew);

module.exports = router;  