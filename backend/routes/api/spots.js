const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize, ReviewImage, Booking } = require('../../db/models');
const { application } = require('express');
const {Op} = require('sequelize');


//-------------------------------------------------------------
//---------------------------ROUTES----------------------------
//-------------------------------------------------------------



//-------------------------------------------------------------
//------------------------GET ALL SPOTS------------------------
//-------------------------------------------------------------


router.get('/', restoreUser, async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    let pagination = {};
    let where = {};

    if (maxLat || minLat) {
        where.lat = {}
    }
    if (maxLng || minLng) {
        where.lng = {}
    }
    if (maxPrice || minPrice) {
        where.price = {}
    }

    const err = {
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
            "page": "Page must be greater than or equal to 1",
            "size": "Size must be greater than or equal to 1",
            "maxLat": "Maximum latitude is invalid",
            "minLat": "Minimum latitude is invalid",
            "minLng": "Maximum longitude is invalid",
            "maxLng": "Minimum longitude is invalid",
            "minPrice": "Maximum price must be greater than or equal to 0",
            "maxPrice": "Minimum price must be greater than or equal to 0"
        }
    }

    if (!page) page = 1;
    if (!size) size = 20;

    if (page < 0 || page > 10){
        return res.status(400).send(err)
    }

    if (page < 0 || page > 10) {
        return res.status(400).send(err)
    }

    if (size < 0 || size > 20) {
        return res.status(400).send(err)
    }

    if (minLat){
        if (isNaN(Number(minLat))) {
            return res.status(400).send(err)
        }
        Object.assign(where.lat, {[Op.gte]: +minLat});
    }

    if (maxLat) {
        if (isNaN(Number(maxLat))) {
            return res.status(400).send(err)
        }
        Object.assign(where.lat, {[Op.lte]: +maxLat});
    }

    if (minLng) {
        if (isNaN(Number(minLng))) {
            return res.status(400).send(err);
        }
        Object.assign(where.lng, { [Op.gte]: +minLng });
    }

    if (maxLng) {
        if (isNaN(Number(maxLng))) {
            return res.status(400).send(err)
        }
        Object.assign(where.lng, { [Op.lte]: +maxLat });
    }

    if (minPrice) {
        if (isNaN(Number(minPrice)) || +minPrice < 0) {
            return res.status(400).send(err)
        }
        Object.assign(where.price, { [Op.gte]: +minPrice });

    }

    if (maxPrice) {
        if (isNaN(Number(maxPrice)) || +maxPrice < 0) {
            return res.status(400).send(err)
        }
        Object.assign(where.price, { [Op.lte]: +maxPrice });
    }

    pagination.limit = +size;
    pagination.offset = +size * (+page - 1);

    let spotList = await Spot.findAll({
        include: [{model: Review}],
        ...pagination,
        where
    });
    let spots = [];

    // N+1 Query, refactor later?
    // go through spotList and aggregate query for the average star
    // rating from the reviews. assign avg rating value to key in spot object
    // to be returned. then finds associate image preview url and adds it to
    // spot object
    for (let spot of spotList) {

        // Won't let me add spot value unless I convert this to JSON and make
        // new spots array for some reason
        spot = spot.toJSON();

        let total = 0;

        spot.Reviews.forEach(review => {
            total+=review.stars
        });

        spot.avgRating = total / spot.Reviews.length;

        delete spot.Reviews;

        // find preview image url and assign to previewImage varable
        let previewImage;
        previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });

        // append queried values to spot object
        // spot.reviewData = reviewData[0].dataValues.reviewData;
        if (previewImage) spot.previewImage = previewImage.dataValues.url;
        else spot.previewImage = null;
        spots.push(spot);

    };
    res.status(200)
    res.json({Spots:spots})

});


//-------------------------------------------------------------
//-------------------------------------------------------------

//-------------------------------------------------------------
//-------------------------------------------------------------


router.get('/current', restoreUser, requireAuth, async (req, res) => {

    const userId = req.user.dataValues.id;
    if (!userId) res.json(new Error("No user logged in"));

    let spotList = await Spot.findAll({
        where: {ownerId: userId },
        include: [{ model: Review }]
    });
    let spots = [];

    for (let spot of spotList) {

        spot = spot.toJSON();

        let total = 0;
        spot.Reviews.forEach(review => {
            total += review.stars
        });

        spot.avgRating = total / spot.Reviews.length;

        delete spot.Reviews;



        let previewImage;
        previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
             }
        });

        //spot.avgRating = reviewData[0].dataValues.reviewData;
        if (previewImage) spot.previewImage = previewImage.dataValues.url;
        else spot.previewImage = null;
        spots.push(spot);
    };

    res.status(200)
    res.json(spots)


});

//-------------------------------------------------------------
//-------------------------------------------------------------
// GET DETAILS OF SPOT BY ID
//-------------------------------------------------------------
//-------------------------------------------------------------


router.get('/:spotId', async (req, res) => {

    //get spotId from params in request object
    const spotId = req.params.spotId;
    console.log(spotId)


    //Find proper spot with matching spotId
    let spot = await Spot.findOne({
        where: {id: spotId},
        include: [{ model: Review }]
    });

    let total = 0;
    spot.Reviews.forEach(review => {
        total += review.stars
    });

    if (!spot) return res.status(404).send({
        "message": "Spot couldn't be found",
        "statusCode": 404
    });

    // Find owner as Owner;
    const Owner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ["id", "firstName", "lastName"]
    });

    //find average rating


    let SpotImages = [];

    let imageList = await SpotImage.findAll({
        where: {
            spotId: spot.id
        },
        attributes: ["id", "url", "preview"]
    });

    for (let image of imageList) {
        SpotImages.push(image.dataValues)
    }



    //append queries values into response object
    spot.SpotImages = SpotImages;
    spot.Owner = Owner;
    spot.avgRating = total / spot.Reviews.length;
    spot.numReviews = spot.Reviews.length;
    delete spot.Reviews;

    res.json(spot)

});


//-------------------------------------------------------------
//-------------------------------------------------------------
// GET ALL SPOTS FROM SPOT ID
//-------------------------------------------------------------
//-------------------------------------------------------------

router.get('/:spotId/reviews', async (req, res) => {

    const reviewList = await Review.findAll({
        where: {spotId:req.params.spotId},
        attributes: {include: ['id']}
    });

    if(!reviewList.length) {
        return res.status(404).send({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })
    }

    let Reviews = [];
    for (let review of reviewList) {

        review = review.toJSON();
        let reviewer = await User.findOne({
            where:{
                id: review.userId
            },
            attributes: ['id', 'firstName', 'lastName']
        });
        //console.log(review)

        let imgArr = [];
        let imageList = await ReviewImage.findAll({
            where:{reviewId:review.id},
            attributes: ['id','url']
        });
        for (let image of imageList) imgArr.push(image.toJSON())
        reviewer = reviewer.toJSON();
        review.User = reviewer;
        review.ReviewImages = imgArr;
        Reviews.push(review)
    }


    res.json({Reviews});
});

//-----------------------------------------------------------------
//-----------------------------------------------------------------
// GET BOOKINGS OF SPOT BASED ON ITS ID
//-----------------------------------------------------------------
//-----------------------------------------------------------------

router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;

    let spot = await Spot.findOne({
        where: {id:spotId}
    });

    if(!spot) {
        return res.status(404).send({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    spot = spot.toJSON()

    console.log(userId, spotId, spot.ownerId)

    //console.log(spot.toJSON())
    //let Bookings = [];
    let bookingsList;

    if (Number(userId) === Number(spot.ownerId)) {
        bookingsList = await Booking.findAll({
            where: { spotId },
            attributes: {include: ['id']},
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });

    } else {
        bookingsList = await Booking.findAll({
            where: { spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        });
    }

    console.log(bookingsList)

res.json({Bookings:bookingsList})
});


//-------------------------------------------------------------
//-------------------------------------------------------------

//-------------------------------------------------------------
//-------------------------------------------------------------


router.post('/', restoreUser, requireAuth, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (!address || !city  || !state || !country || ! lat || !lng || !name || !description || !price) {

            res.status(400);
            res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "address": "Street address is required",
                    "city": "City is required",
                    "state": "State is required",
                    "country": "Country is required",
                    "lat": "Latitude is not valid",
                    "lng": "Longitude is not valid",
                    "name": "Name must be less than 50 characters",
                    "description": "Description is required",
                    "price": "Price per day is required"
                }
            });
        }

    const newSpot = Spot.build({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    await newSpot.save();
    res.status(201);
    res.json(newSpot);

});


//-------------------------------------------------------------
//-------------------------------------------------------------

//-------------------------------------------------------------
//-------------------------------------------------------------


router.post('/:spotId/images', restoreUser, async (req, res) => {

    const id = req.params.spotId;
    const spot = await Spot.findOne({ where: { id:id , ownerId: req.user.dataValues.id  }});
    if (!spot) {
        res.status(404);
        res.send({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    const { url, preview } = req.body;
    let newImg = SpotImage.build({
        spotId: id,
        url,
        preview
    });

    await newImg.save();
    newImg = newImg.toJSON();
    res.status(200)
    res.json({id: newImg.id, url: newImg.url, preview: newImg.preview});
});

//-------------------------------------------------------------
//-------------------------------------------------------------

//-------------------------------------------------------------
//-------------------------------------------------------------


router.post('/:spotId/reviews', restoreUser, async (req, res) => {

    const { review, stars } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.dataValues.id;

    const spot = await Spot.findOne({where:{id:spotId}});
    if (!spot) {
        return res.status(404).send({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (!review || !stars ) {
        return res.status(400).send({
            "message": "Validation error: please check that review & stars are supplied & correctly formatted",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        });
    }

    const newReview = Review.build({
        spotId,
        userId,
        review,
        stars
    });

    const reviewCheck = await Review.findOne({where: {spotId, userId}});
    if(reviewCheck) {
        return res.status(403).send({
            "message": "User already has a review for this spot",
            "statusCode": 403
        });
    }

    await newReview.save();
    //console.log(newReview)

    const resReview = await Review.findOne({
        where: {createdAt: newReview.createdAt, userId:userId, spotId:spotId },
        attributes: {include: ['id']}
    });

    res.status(201)
    res.json(resReview);
});
//-------------------------------------------------------------
//-------------------------------------------------------------
// CREATE BOOKING BY SPOT ID
//-------------------------------------------------------------
//-------------------------------------------------------------

router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {

    const spotId = req.params.spotId;
    const userId = req.user.id;
    let { startDate, endDate } = req.body;

    let bookingsList = await Booking.findAll({
        where: {spotId: spotId}
    });

    let spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).send({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (userId === spot.ownerId) {
        return res.status(403).send({
            "message": "Cannot create a booking for a spot you own"
        });
    }

    startTime = new Date(startDate).getTime();
    endTime = new Date(endDate).getTime();

    if (endTime <= startTime) {
        return res.status(400).send({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        });
    }

    for (let booking of bookingsList) {

        let conflict = false;
        let start = new Date(booking.startDate).getTime();
        let end = new Date(booking.endDate).getTime();

        if (startTime <= end && startTime >= start) conflict = true;
        if (endTime <= end && endTime >= start) conflict = true;
        if (startTime <= start && endTime >= end) conflict = true;

        if (conflict === true) {
            return res.status(403).send({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            });
       };




        console.log(start, end);
    }

    const newBooking = Booking.build({
        spotId,
        userId,
        startDate,
        endDate
    });

    await newBooking.save();

    const bookingRes = await Booking.findOne({
        where:{spotId, userId, startDate: newBooking.startDate },
        attributes: {include: ['id']}
    });

    res.status(200);
    res.json(bookingRes);
});


//-------------------------------------------------------------
//-------------------------------------------------------------

//-------------------------------------------------------------
//-------------------------------------------------------------


router.put('/:spotId', restoreUser, async (req, res) => {
    const id = req.params.spotId;
    const values = { address, city, state, country, lat, lng, name, description, price } = req.body;
    console.log(values, address)
    const spot = await Spot.findOne({ where: { id: id, ownerId: req.user.dataValues.id } });

    if (!spot) {
        return res.status(404).send({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    for (let value of Object.values(values)){
        if (!value){
            res.status(400);
            res.send({
                "message": "Validation Error: Check that all of the following values are supplied and in the proper format",
                "statusCode": 400,
                "errors": {
                    "address": "Street address is required",
                    "city": "City is required",
                    "state": "State is required",
                    "country": "Country is required",
                    "lat": "Latitude is not valid",
                    "lng": "Longitude is not valid",
                    "name": "Name must be less than 50 characters",
                    "description": "Description is required",
                    "price": "Price per day is required"
                }
            });
        };
    };



    spot.set({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description
    });

    await spot.save();

    res.status(200);
    res.json(spot);

});


//-------------------------------------------------------------
//-------------------------------------------------------------

//-------------------------------------------------------------
//-------------------------------------------------------------

router.delete("/:spotId", restoreUser, async (req, res) => {
    const id = req.params.spotId;
    let spot = await Spot.findOne({ where: { id, ownerId: req.user.dataValues.id } });
    if(!spot) {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    } else {
        await spot.destroy();

        res.status(200)
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }
});



module.exports = router;


// const avgGradeData = await StudentClassroom.findAll({
    // attributes: {
    //     include: [
    //         [
    //             Sequelize.fn("AVG", Sequelize.col("grade")),
    //             'avgAllGrades'
    //         ]
    //     ]
    // },
//     where: {
//         classroomId: req.params.id
//     }
// });

// classroom.avgGrade = avgGradeData[0].dataValues.avgAllGrades
