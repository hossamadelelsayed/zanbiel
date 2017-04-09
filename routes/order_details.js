/**
 * Created by a4p2 on 4/6/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.post('/create', function(req, res) {
    models.ODetails.create(req.body)
        .then(function(odetails) {
            res.send(odetails);
        });
});
router.post('/update', function(req, res) {
    models.ODetails.update(
        req.body,
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(odetails) {
            res.send(odetails);
        });
});
router.post('/destroy', function(req, res) {
    models.ODetails.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
});
router.get('/get/:order_id', function (req, res) {
    models.ODetails.find({
        where: {
            order_id: req.params.order_id
        },
        include: [
            { model: models.Product },
            { model: models.MeasureUnit }
        ]
    }).then(function(odetails) {
        res.send(odetails);
    });
});
module.exports = router;