const express = require("express");
const Testimonial = require("../controllers/testimonial"); 
const router = express.Router();

router.post("/postNewTestimonial",  Testimonial.postNewTestimonial);
router.get("/getAll",  Testimonial.getAll);
router.delete("/deleteOne/:id",  Testimonial.deleteOne);
  
module.exports = router;  