require('dotenv').config();
const express = require('express');
const { dirname } = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);


const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions))
app.use(express.static('public'));

app.use(session({
	secret: 'arsen1c',
	resave: true,
	saveUninitialized: true
}))

const connectDB = require('./config/db');
connectDB();
  
app.use(express.urlencoded({extended : false }));
app.use(express.json());

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/authController'));
app.use('/api/files', require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
