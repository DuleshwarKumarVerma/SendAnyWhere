const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require("../config/auth.js");
const passport = require('passport');

router.get('/', ensureAuthenticated, (req, res) => {
	res.render('index', {
		user: req.user
	});
})


router.get('/dashboard', ensureAuthenticated, (req, res) => {
	res.render('dashboard', {
		user: req.user
	});
})

module.exports = router;