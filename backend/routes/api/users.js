const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


/*  checks to see if req.body.email exists and is an email,
req.body.username is a minimum length of 4 and is not an email,
and req.body.password is not empty and has a minimum length of 6.
If at least one of the req.body values fail the check, an error
will be returned as the response. */

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.use((req, res, next) => {
    console.log('-----------------');
    next();
});


router.post('/', validateSignup, async (req, res) => {
    console.log('111111111111111111111111')
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user)

    return res.json({
        user
    });
});


module.exports = router;
