const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const WrapAsync = require('../utils/WrapAsync.js');
const passport = require('passport');
const { isLoggedIn } = require('../middleware.js');
const {saveRedirectUrl} = require('../middleware.js');
const UserController = require('../controllers/users.js')


router.route('/signup')
    .get(UserController.renderSignupForm)
    .post(WrapAsync(UserController.signup));

router.route('/login')
    .get( UserController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}),UserController.login);

//logout
router.get('/logout', isLoggedIn,UserController.logout);

module.exports = router;