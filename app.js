
if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const MONGO_URL = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(MONGO_URL);   
}

main().then(()=> {
    console.log("Mongoose connection was successful!")
}).catch(err => {
    console.log(err);
})

app.set('view engine', 'ejs'); //app.set is for configure settings
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended : true}));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride("_method"));

const sessionOptions = {
    secret : "mysupersecret",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};


//root route
// app.get('/', (req,res)=> {
//     res.send("Home")
// })
 
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).render('error', { message });
});

app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`)
})