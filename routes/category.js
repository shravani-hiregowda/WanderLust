const express = require("express");
const router = express.Router();
const ListingController = require("../controllers/listings.js");
const wrapAsync = require("../utils/WrapAsync.js");

router.get('/category/:category', wrapAsync(ListingController.renderCategoryListing)); // ✅ correct

module.exports = router;
