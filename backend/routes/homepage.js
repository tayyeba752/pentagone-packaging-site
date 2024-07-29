const express = require("express");
const Homepage = require("../controllers/hoempage");
const router = express.Router();

router.post("/postNew", Homepage.postNew);
router.get("/getAll", Homepage.getAll);
router.patch("/updateData", Homepage.updateData);


module.exports = router;  