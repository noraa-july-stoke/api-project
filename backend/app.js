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


const { environment } = require('./config');
const isProduction = environment === 'production';


const routes = require('./routes');

/* ______________________________________________
* -----------------------------------------------
* REQUIRES EXPRESS
* _______________________________________________
* -----------------------------------------------*/

const app = express();

/* ______________________________________________
* -----------------------------------------------
* CONNECTIS MORGAN MIDDLEWARE FOR LOGGING INFO
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


module.exports = app;
