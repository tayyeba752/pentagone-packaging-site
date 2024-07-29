const express = require("express");
const Catagory = require("../controllers/catagory");
const router = express.Router();

router.post("/AddNew", Catagory.postNew);

router.get("/getOneRelToIndustry/:id", Catagory.getOneRelToIndustry);

router.get("/getOne/:id", Catagory.getById);
router.get("/getAll", Catagory.getAll);
router.delete("/deleteOne/:id", Catagory.deleteOne);
router.patch("/updateData", Catagory.updateData);


module.exports = router;   