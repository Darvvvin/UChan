// Import
const express 	 = require('express');
const fs 		     = require('fs');
const hbs 		   = require('hbs');
const mongoose 	 = require('mongoose');
const path 		   = require('path');

// Sessions and Cookies
const session   = require('express-session');
const cookieParser   = require('cookie-parser');
const bodyParser = require('body-parser');

const app 		  = express();

//Init Cookie and Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Controller Imports
const BoardController = require('../controller/boardController.js');
const IndexController = require('../controller/indexController.js');
const ThreadController = require('../controller/threadController.js');

// DB Constants
const database = require('../model/database.js');

//Init Sessions
app.use(
    session({
        key: 'local_user', //user session id
        secret: 'toptenpspgames',
        resave: false,
        saveUninitialized: true,
        store: database.sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 Day.
        },
    }),
);

app.use((req, res, next) => {
    if (req.cookies.local_user && !req.session.user) {
        res.clearCookie('local_user');
    }
    next();
});

// Multer Image Processing
var multer = require('multer');
var storage = multer.diskStorage({
    destination:  './public/postimgs',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}),


upload = multer({ storage: storage, limits: {fileSize: database.IMAGE_SIZE_LIMIT} }).single('postImageInput');

app.get('/', IndexController.getIndex);

/* Static Pages */

app.get('/about', function (req, res) {
	res.render('about', {
		title: 'About',
		thread: false,
	});
});

app.get('/thread', function (req, res) {
	res.render('thread', {
		title: 'Thread',
		thread: true,
	});
});


app.get('/:board', BoardController.getBoard);
app.post('/createThread/:board', upload, BoardController.createThread);
app.post('/verifyCaptcha', BoardController.validateCaptcha);

app.get('/thread/:postNumber', ThreadController.getThread);
app.post('/replyThread/:postNumber', upload, ThreadController.replyThread);

module.exports = app;
