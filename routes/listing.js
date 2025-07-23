const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listings.js');
const {isLoggedIn, isReviewAuthor, isOwner, validateListing} = require('../middleware.js');
const ListingController = require('../controllers/listings.js');

router.get('/category/:category', wrapAsync(ListingController.renderCategoryListing)); 

router.route('/') 
    .get(wrapAsync(ListingController.index))
    .post(isLoggedIn, validateListing, wrapAsync(ListingController.newListing));

router.get('/new',isLoggedIn, ListingController.renderNewForm);


router.route('/:id')
    .get(wrapAsync(ListingController.showListing))
    .put(isLoggedIn, isOwner, wrapAsync(ListingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));




//edit route
router.get('/:id/edit',isLoggedIn, isOwner,wrapAsync(ListingController.editListing));

module.exports = router;