const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize } = require('../../db/models');
const { application } = require('express');



//-------------------------------------------------------------
//---------------------------ROUTES----------------------------
//-------------------------------------------------------------


router.get('/', async (req, res) => {


    //Gets list of spots
    let spotList = await Spot.findAll();
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
        const reviewData = await Review.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn("AVG", Sequelize.col("stars")),
                        'reviewData'
                    ]
                ]
            },
            where: {spotId: spot.id}
        });

        // find preview image url and assign to previewImage varable
        let previewImage;
        previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });


        //append queried values to spot object
        spot.reviewData = reviewData[0].dataValues.reviewData;
        if (previewImage) spot.previewImage = previewImage.dataValues.url;
        else spot.previewImage = null;
        spots.push(spot);

    };
    res.status(200)
    res.json(spots)

});

//-------------------------------------------------------------
//-------------------------------------------------------------
router.get('/current', restoreUser, async (req, res) => {

    const userId = req.user.dataValues.id;
    if (!userId) res.json(new Error("No user logged in"))
    console.log(userId)
    let spotList = await Spot.findAll({
        where: {ownerId: userId }
    });
    let spots = [];

    for (let spot of spotList) {

        spot = spot.toJSON();
        const reviewData = await Review.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.fn("AVG", Sequelize.col("stars")),
                        'reviewData'
                    ]
                ]
            },
            where: { spotId: spot.id }
        });

        let previewImage;
        previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
             }
        });

        spot.reviewData = reviewData[0].dataValues.reviewData;
        if (previewImage) spot.previewImage = previewImage.dataValues.url;
        else spot.previewImage = null;
        spots.push(spot);
    };

    res.status(200)
    res.json(spots)


res.json(spots)

});

//-------------------------------------------------------------
//-------------------------------------------------------------

router.get('/:spotId', async (req, res) => {

    //get spotId from params in request object
    const spotId = req.params.spotId;
    console.log(spotId)


    //Find proper spot with matching spotId
    let spot = await Spot.findOne({
        where: {
            id: spotId
        }
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
    let reviewData = await Review.findAll({
        attributes: {
            include: [
                [
                    Sequelize.fn("AVG", Sequelize.col("stars")),
                    'avgRating'
                ],
                [
                    Sequelize.fn("COUNT", Sequelize.col("stars")),
                    'numReviews'
                ]
            ]
        },
        where: { spotId: spot.id }
    });

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

    console.log(SpotImages)



    //append queries values into response object
    spot.dataValues.numReviews = reviewData[0].dataValues.numReviews;
    spot.dataValues.avgStarRating = reviewData[0].dataValues.avgRating;
    spot.dataValues.SpotImages = SpotImages;
    spot.dataValues.Owner = Owner;

    res.json(spot)

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
