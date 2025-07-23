const express = require('express');
const router = express.Router({mergeParams : true});
const wrapAsync = require('../utils/WrapAsync');
const Review = require('../models/review.js');
const Listing = require('../models/listings.js');
const {validateReview, isLoggedIn,isOwner} = require('../middleware.js')
const ReviewController = require('../controllers/reviews.js');

//post
router.post('/', isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));

 
 //delete review route
 router.delete('/:reviewId',isLoggedIn, isOwner, wrapAsync(ReviewController.destroyReview));

 module.exports = router;
 
 