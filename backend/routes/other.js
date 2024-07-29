const express = require("express");
const Other = require("../controllers/other");
const router = express.Router();

router.post("/addNew", Other.postNew);
router.get("/getOne/:id", Other.getById);
router.get("/getAll", Other.getAll);
router.delete("/deleteOne/:id", Other.deleteOne);
router.patch("/updateData", Other.updateData);


module.exports = router;  