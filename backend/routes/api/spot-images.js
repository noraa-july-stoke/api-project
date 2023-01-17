const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, SpotImage, Sequelize, ReviewImage, Booking } = require('../../db/models');
const { application } = require('express');


//-----------------------------------------------------------------
//-----------------------------------------------------------------
// DELETE A SPOT IMAGE
//-----------------------------------------------------------------
//-----------------------------------------------------------------


router.delete('/:imageId', requireAuth, async (req, res) => {

    const userId = req.user.id;
    const imageId = req.params.imageId;

    const deleteImage = await SpotImage.findOne({
        where: {id:imageId},
        include: [{model: Spot}]
    });

    if (!deleteImage) {
        return res.status(404).send({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }

    if (deleteImage.Spot.ownerId !== userId) {
        return res.status(403).send({
            "message": "you are not authorized to delete this"
        });
    };

    await deleteImage.destroy();

    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});


module.exports = router;
