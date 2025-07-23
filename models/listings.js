const mongoose = require('mongoose');
const Review = require('./review.js');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image: {
        url: {
            type: String,
            default: 'https://unsplash.com/photos/palm-tree-against-a-bright-blue-sky-tt8NhCE0Hvw'
        }
    },
    price : {
        type : Number
    },
    location : {
        type : String
    },
    country  : {
        type : String
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    category : {
        type : String,
        enum : ["trending", "rooms", "cities", "mountains", "castles", "pools", "camping", "farms", "arctics"]
    }
});

listingSchema.post("findOneAndDelete", async (listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}})
    }

})

const Listing = mongoose.model("Listing", listingSchema);
module.exports =  Listing;