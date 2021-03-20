const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

router.get('/register' , (req ,res)=>{
    res.render('register')
});

router.get('/login' , (req ,res)=>{
    res.render('login')
});

router.post('/register', async (req ,res)=>{
    console.log(req.body);
	const { username, email, password, password2 } = req.body;

	// Array of errors
	const errors = [];

	if (!username || !email || !password || !password2) {
		errors.push({ msg: 'Please fill in all the fields' });
	}

	// Check if both passwords match
	if (password !== password2) {
		errors.push({ msg: 'Passwords did not match' });
	}

	// Check if password is more than 5 characters
	if (password.length < 5) {
		errors.push ({ msg: 'Password must be of atleast 5 characters longs' });
	}

	if (errors.length > 0) {
		res.render('register', { errors, username, password, email })
	} else {
		User.findOne({ email: email }).exec((err, user) => {
			console.log("USER EXISTS: ", user);
			if (user) {
				console.log("EMAIL EXISTS");
				errors.push({ msg: 'Email already exists' });
				res.render('register', { errors, username, password, email })
			}
        })
        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 13)
        // Create a user 
        const user = new User({
            username,
            email,
            password: hashedPassword
        })

        user.save().then(value => {
            console.log('New user saved: ' + value);
            //req.flash('success_msg', 'Success! A verification link is sent to your email.');
            res.redirect('/users/login');
        }).catch(err => {
            console.log(err);
            req.flash('error_msg', err.message);
            res.redirect('/users/login');
        })
				
	}
});

router.post('/login', (req, res, next) => {
	console.log('Request arrived');
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
});

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'Logged out!');
	res.redirect('/users/login');
});

module.exports = router;