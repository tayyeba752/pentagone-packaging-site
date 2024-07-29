const express = require("express");
const Industry = require("../controllers/industry");
const router = express.Router();

router.post("/addNew", Industry.postNew);
router.get("/getOne/:id", Industry.getById);
router.get("/getAll", Industry.getAll);
router.delete("/deleteOne/:id", Industry.deleteOne);
router.patch("/updateData", Industry.updateData);

router.get("/search/:id", Industry.search);
router.get("/getSingleProduct/:id", Industry.GetSingleProduct);


module.exports = router;  