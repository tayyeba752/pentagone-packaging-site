const express = require("express");
const Header = require("../controllers/header");
const router = express.Router();

router.post("/headerImgPost", Header.postNew);
router.get("/headerImgGet", Header.getAll);

module.exports = router;  