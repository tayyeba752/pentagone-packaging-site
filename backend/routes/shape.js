const express = require("express");
const Shape = require("../controllers/shape");
const router = express.Router();

router.post("/AddNew", Shape.postNew);
router.get("/getOne/:id", Shape.getById);
router.get("/getAll", Shape.getAll);
router.delete("/deleteOne/:id", Shape.deleteOne);
router.patch("/updateData", Shape.updateData);

module.exports = router; 