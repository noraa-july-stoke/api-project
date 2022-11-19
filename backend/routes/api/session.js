const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');



// The validateLogin middleware is composed of the check and handleValidationErrors
// middleware.It checks to see whether or not req.body.credential and
// req.body.password are empty.If one of them is empty, then an error will be
// returned as the response

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
        handleValidationErrors
]


router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    } else return res.json({user: null});
});

// logs user in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login Failed');
        err.status = 401;
        err.title = 'Login Failed';
        err.errors = ['The provided credentials were invalid'];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({user: user});

});


//Logs the user out
router.delete('/', (_req,res) => {
    res.clearCookie('token');
    return res.json({ message: 'success'});
});



module.exports = router;
