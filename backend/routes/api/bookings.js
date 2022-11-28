const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize, ReviewImage, Booking } = require('../../db/models');
const { application } = require('express');



//-----------------------------------------------------------------
//-----------------------------------------------------------------
// GET CURRENT USER'S BOOKINGS
//-----------------------------------------------------------------
//-----------------------------------------------------------------


router.get('/current', restoreUser, async (req, res) => {

    let Bookings = [];
    const userId = req.user.dataValues.id;
    let bookingList = await Booking.findAll({
        where: { userId },
        attributes: {include: ['id']},
        include: {
            model: Spot,
            attributes: {exclude: ['createdAt', 'updatedAt', 'description']}
        }
    });


    for (let booking of bookingList) {
        booking = booking.toJSON();

        let previewImage = await SpotImage.findOne({
            where: {
                preview: true,
                spotId: booking.Spot.id
            },
            attributes: ['url'],
        });
        previewImage = previewImage.toJSON();
        booking.Spot.previewImage = previewImage.url;
        Bookings.push(booking)
    }


    res.json({Bookings});

});



module.exports = router;
