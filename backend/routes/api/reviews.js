const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize, ReviewImage } = require('../../db/models');
const { application } = require('express');


//-------------------------------------------------------------
//-------------------------------------------------------------
// GET ALL REVIEWS OF CURRENT USER
//-------------------------------------------------------------
//-------------------------------------------------------------


router.get('/current', restoreUser, requireAuth, async (req, res) => {

    const Reviews = [];
    const id = req.user.dataValues.id;

    const reviews = await Review.findAll({
        where:{userId: id},
        attributes: {include: ['id'] }
    });

    let user = await User.findOne({
        where: {id},
        attributes: ['id', 'firstName', 'lastName']
    });

    user = user.toJSON();

    //-----------------------//
    for (let review of reviews) {

        //Turn review into something friendlier to work with.
        review = review.toJSON();

        // Query for models that are tied to specific review ID
        // SPOT & ReviewImages;
        let spot = await Spot.findOne({
            where:{id:review.spotId},
            attributes: {exclude: ['updatedAt', 'createdAt', 'description']},
        });
        spot = spot.toJSON();


        let previewImage = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: spot.id
             },
            attributes: ['url'],
        });
        previewImage = previewImage.toJSON();
        spot.previewImage = previewImage.url;

        let reviewImages = await ReviewImage.findAll({
            where: {reviewId: review.id},
            attributes: ['id', 'url']
        });

        let imgArr = [];
        for (let image of reviewImages) imgArr.push(image.toJSON());

        //append values
        review.User = user;
        review.Spot = spot;
        review.ReviewImages = imgArr;
        //console.log(review)
        Reviews.push(review)
    }
    //const ReviewImages = await ReviewImage.findAll({where:{spotId:}})


    res.status(200);
    res.json({Reviews});

});



//-------------------------------------------------------------
//-------------------------------------------------------------
// ADD IMAGE TO REVIEW BASED ON REVIEW ID
//-------------------------------------------------------------
//-------------------------------------------------------------

router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res) => {

    const { url } = req.body;
    const reviewId = req.params.reviewId;

    const review = await Review.findOne({
        where: {id: reviewId}
    });

    if(!review) {
        return res.status(404).send({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }

    const imgList = await ReviewImage.findAll({
        where: {
            reviewId
        }
    });

    if (imgList.length >= 10 ) {
        res.status(403).send({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        });
    }

    const newImg = await ReviewImage.create({
        reviewId,
        url
    });

    await newImg.save();

    const resImg = await ReviewImage.findOne({
         where: {
            createdAt: newImg.createdAt,
            reviewId
        },
        attributes: ['id', 'url']
    });


    res.status(200)
    res.json(resImg)

});

//-------------------------------------------------------------
//-------------------------------------------------------------
// EDIT A REVIEW
//-------------------------------------------------------------
//-------------------------------------------------------------


router.put('/:reviewId', restoreUser, requireAuth, async (req, res) => {

    const reviewId = req.params.reviewId;

    const { review, stars } = req.body;

    if (!review || !stars) {
        return res.status(400).send({
            "message": "Validation error: please check required values exist and are properly formatted",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }

    let editReview = await Review.findOne({
        where: {id: reviewId},
        attributes: {include: ['id']}
    });

    if(!editReview) {
        return res.status(404).send({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }

    editReview.review = review;
    editReview.stars = stars;

    await editReview.save();


    res.status(200)
    res.json(editReview);

});

//-------------------------------------------------------------
//-------------------------------------------------------------
// DELETE REVIEW
//-------------------------------------------------------------
//-------------------------------------------------------------

router.delete('/:reviewId', restoreUser, requireAuth, async (req, res) => {
    const id = req.params.reviewId;

    const deleteReview = await Review.findByPk(id);

    console.log(deleteReview)

    if (!deleteReview){
        return res.status(404).send({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    } else {

        await deleteReview.destroy();

        res.status(200)
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }

});






//-------------------------------------------------------------
//-------------------------------------------------------------

//-------------------------------------------------------------
//-------------------------------------------------------------



module.exports = router;







// const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20),
// });
