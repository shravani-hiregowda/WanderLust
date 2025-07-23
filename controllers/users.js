const User = require('../models/user.js');

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async(req, res) => {
    try {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});

   let registeredUser =  await User.register(newUser, password);
    req.login(registeredUser, (err) => {
        if(err) {
            next(err);
        }
            req.flash('success', "Welcome to Wanderlust");
            res.redirect('/listings')
    });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect('/signup');
    } 
};

module.exports.renderLoginForm = (req, res) =>{
    res.render('users/login.ejs');
};

module.exports.login = async(req, res) =>{
    req.flash('success', 'Welcome back!');
    let redirectUrl = res.locals.redirectUrl;
    if(redirectUrl) {
            res.redirect(res.locals.redirectUrl);
    } else {
        res.redirect('/listings')
    }
       
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        } 
        req.flash("success", "You are logged out now");
        res.redirect('/listings')
    })
};