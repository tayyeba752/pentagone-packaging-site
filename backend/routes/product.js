const express = require("express");
const Product = require("../controllers/product");
const router = express.Router();

router.post("/postNew", Product.postNew);
router.get("/getAllProduct", Product.AllProducts);
router.get("/getSingleProduct/:id", Product.GetSingleProduct);
router.get("/getByName/:id", Product.GetSingleProductByName);
router.delete("/DeleteSinglProduct/:id", Product.DeleteSinglProduct);

module.exports = router;  