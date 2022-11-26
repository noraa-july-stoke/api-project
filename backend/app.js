/* _________________________________________________
* --------------------------------------------------
* PACKAGE & variable IMPORTS, declares
* isProduction variable to check what environment
* to load app in, by checking environment key in
* backeng/config/index.js
* __________________________________________________
* --------------------------------------------------*/


const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { ValidationError } = require('sequelize');
const { environment } = require('./config');
const isProduction = environment === 'production';


const routes = require('./routes');

/* ______________________________________________
* -----------------------------------------------
* initiates an instance of express
* _______________________________________________
* -----------------------------------------------*/

const app = express();

/* ______________________________________________
* -----------------------------------------------
* CONNECTS MORGAN MIDDLEWARE FOR LOGGING INFO
* ABOUT REQ / RES
* _______________________________________________
* -----------------------------------------------*/

app.use(morgan('dev'));

/* ______________________________________________
* -----------------------------------------------
* Add the cookie-parser middleware for parsing
* cookies and the express.json middleware for
* parsing JSON bodies of requests with
* Content-Typeof "application/json". & also add
* several security middlewares:
* _______________________________________________
* -----------------------------------------------*/

app.use(cookieParser());
app.use(express.json());


if (!isProduction) {
    app.use(cors());
};

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes);

/*_________________________________________________
* -------------------------------------------------
* Error-handling middleware
* #1: unmatched requests. creates err from any req
* that has not yet been matched with a route
* #2 process sequelize db validation errors
* #3 Error-Format & send via res.json()
* _________________________________________________
* -------------------------------------------------*/


// #1
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found");
    err.title = "Resource not found";
    err.errors = ["The requested resource couldn't be found"];
    err.status = 404;
    next(err);
});

// #2

//process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a sequelize error
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e)=> e.message);
        err.title = 'Validation error'
    }
    next(err);
});


// #3

app.use((err,_req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({

        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction? null: err.stack

    });
});


module.exports = app;
