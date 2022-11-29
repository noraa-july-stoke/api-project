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


router.get('/current', requireAuth, async (req, res) => {

    let Bookings = [];
    const userId = req.user.id;
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

//-------------------------------------------------------------
//-------------------------------------------------------------
// EDIT A BOOKING
//-------------------------------------------------------------
//-------------------------------------------------------------

router.put('/:bookingId', restoreUser, requireAuth, async (req, res) => {

    const bookingId = req.params.bookingId
    const { startDate, endDate } = req.body;
    const now = new Date().getTime();
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();

    if (endTime < now ) {
        return res.status(403).send({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }


    if (!bookingId) {
        return res.status(400).send({
            "message": "missing booking id"
        });
    }

    const editBooking = await Booking.findByPk(bookingId);
    if (!editBooking) {
        return res.status(404).send({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    }

    if (editBooking.userId !== req.user.id) {
        return res.status(403).send({message: "you cannot edit a booking that does not belong to you!"});
    }

    if (!editBooking) {
        return res.status(404).send({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    let bookingsList = await Booking.findAll({
        where: { spotId: editBooking.spotId }
    });

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

    await editBooking.save()

    editBooking.set({
        startDate,
        endDate
    });

    res.json(editBooking);
});



//-----------------------------------------------------------------
//-----------------------------------------------------------------
// DELETE A BOOOKING
//-----------------------------------------------------------------
//-----------------------------------------------------------------




module.exports = router;
