const express = require("express");
const Quoteform = require("../controllers/quoteform");
const router = express.Router();

router.post("/PostQuoteInformation", Quoteform.postNew);
router.get("/getAllQuotesForm", Quoteform.GetAllQuoteData);
router.get("/getSingleProduct/:id", Quoteform.GetSingleProduct);
router.delete("/DeleteSinglProduct/:id", Quoteform.DeleteSinglProduct);
// router.delete("/download/:filename", Quoteform.Download);


module.exports = router;  