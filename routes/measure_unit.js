/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.post('/create', function(req, res) {
    models.MeasureUnit.create({
        name_ar:req.body.name_ar,
        name_en:req.body.name_en,
        price:req.body.price,
        product_id :req.body.product_id
    })
        .then(function(measure) {
            res.send(measure);
        });
});

router.post('/update', function(req, res) {

    models.MeasureUnit.update({
            name_ar:req.body.name_ar,
            name_en:req.body.name_en,
            notes:req.body.notes,
            category_id:req.body.category_id
        },
        {
            where: {
                id:req.body.id
            }
        })
    .then(function(measure) {
        res.send(measure);
    });
});

router.post('/destroy', function(req, res) {
    models.MeasureUnit.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
});

router.get('/get', function (req, res) {
    models.MeasureUnit.findAll({
        include: [ models.Product ]
    })
        .then(function(measure) {
            res.send(measure);
        });
});

module.exports = router;