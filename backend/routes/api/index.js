
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spot-images.js');
const reviewImagesRouter = require('./review-images.js');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
// middleware connections

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', spotImagesRouter);

router.use('/review-images', reviewImagesRouter);


//Uncomment below route to test basic functionality

// router.post('/test', (req, res) => {
//     res.json({requestBody: req.body});
// });


module.exports = router;









































//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------



//--------------------------------------------
// test routes for /api static resource
//--------------------------------------------


// //test route #1 - get /api
// router.get('/', (_req, res) => {
//     res.json("GET '/api' route working")
// });


// // test route #2
// //Giving me weird error when cant find user, need something better!!
// router.get('/set-token-cookie', async (_req, res, next) => {
//     const user = await User.findOne({
//         where: {
//             username: 'ItsNoraa'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });


// test route #3



// // test route #4
// // checks sends back user if there is token in browser
// // app.use(restoreUser) will populate req.user for us each time
// // the api route is hit if there is a valid cookie present
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });

// //test route #5 will throw 'Unauthorized' error if no token present
// router.get('/require-auth', requireAuth, (req,res) => {
//     return res.json(req.user)

// });
