const Review = require('../models/review.js');
const Listing = require('../models/listings.js');

module.exports.createReview = async(req, res, next) => {
    let { id } = req.params; 
    let listing = await Listing.findById(id);

    if (!listing) {
        return next(new ExpressError(404, "Listing not found"));
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async(req, res)=> {
    let { id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`)
 };