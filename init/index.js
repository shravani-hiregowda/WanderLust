const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listings.js')

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderLust';

async function main() {
    await mongoose.connect(MONGO_URL);   
}

main().then(()=>{
    console.log("Mongoose connection was successful!")
}).catch(err =>{
    console.log(err);
})

const initDb = async () => {
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj, owner : '686a27bc30a947746358f653'}))
   await Listing.insertMany(initData.data)
   console.log("Data was initlized!")

   
}

initDb();