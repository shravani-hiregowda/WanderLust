const Listing = require('../models/listings.js');

module.exports.index = async(req,res)=> {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm =  (req, res)=>{
    res.render('listings/new.ejs');
};

module.exports.showListing = async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate :{path:"author",}}).populate('owner');
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
       return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.newListing = async (req, res, next) => {
     const data = req.body.listing;

    if(typeof data.image !== "object" || !data.image || !data.image.url){
        data.image = {
            filename: 'default',
            url: "https://media.istockphoto.com/id/1347088244/photo/kerala-most-beautiful-place-of-india.jpg?s=1024x1024&w=is&k=20&c=TErl9Rcp8dHOUHxr96Wp4CrryOhCQcfdnCQARr9hWpc="
        };
    }
    const newListing = new Listing(data);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
};

module.exports.editListing = async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
        if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
       return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, {...req.body.listing} );
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`)
};

module.exports.deleteListing = async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect('/listings');
};

module.exports.renderCategoryListing = async (req, res) => {

    const { category } = req.params;
    const listings = await Listing.find({ category: new RegExp(`^${category}$`, 'i') });

    if (listings.length === 0) {
        req.flash("error", "No listings found in this category.");
        return res.redirect('/listings');
    }

    res.render("listings/index.ejs", { allListings: listings });
};

