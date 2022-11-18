//--------------------------------------------
// This file contains login/authentication
// helper functions
//--------------------------------------------


//expiresIn is coming from .env via config/index.js

const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
const { secret, expiresIn } = jwtConfig;

//--------------------------------------------
//--------------------------------------------

//sets JWT cookie after a user is logged in
// to be used in login and signup routes

const setTokenCookie = (res, user) => {

    //#1 Come back and make this error better!
    // debugging error for user not found
    if(!user) throw new Error('Invalid Credentials');


    const token = jwt.sign(
        {data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } //1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // set token cookie

    res.cookie('token', token, {
        maxAge: expiresIn * 1000, //max age in ms
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};



//this middleware will be in API router for route handlers to
//check if there is a user logged in or not

const restoreUser = (req, res, next) => {
    // parsing req for cookie token
    const { token } = req.cookies;
    req.user = null;

    //Returns payload decoded if signature is valid and optional
    //expiration, audience, or issuer are valid. If not, it will throw the error.
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err){
            return next();
        }

        // assigns user if jwt cookie passed validation
        // if not throws error
        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

//requires session user to be authenticated before accessing a route
//if no current user, returns an error
//to be put into routes which need logged in status to access
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    //if the statement above is false(no user logged in), creates an error
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
};


module.exports = { setTokenCookie, restoreUser, requireAuth };
