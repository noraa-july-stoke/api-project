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

router.post('/', validateSignup, async (req, res) => {

    const { username, email, firstName, lastName, password } = req.body;
    const userExists = await User.findOne({
        where: {email}
    })
    if (userExists) {
        return res.status(403).send({
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
                "email": "User with that email already exists"
            }
        });
    }
    const user = await User.signup({ username, email, firstName, lastName, password });

    const token = await setTokenCookie(res, user)

    return res.json({user:{...user.toJSON(), token}});
});




module.exports = router;
