const express = require("express");
const Material = require("../controllers/material");
const router = express.Router();

router.post("/AddNew", Material.postNew);
router.get("/getOne/:id", Material.getById);
router.get("/getAll", Material.getAll);
router.delete("/deleteOne/:id", Material.deleteOne);
router.patch("/updateData", Material.updateData);

module.exports = router;    