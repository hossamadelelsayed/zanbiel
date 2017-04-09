/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.post('/create', function(req, res) {
    models.Product.create({
        name_ar:req.body.name_ar,
        name_en:req.body.name_en,
        notes:req.body.notes,
        category_id:req.body.category_id
    })
        .then(function(product) {
            res.send(product);
        });
});

router.post('/update', function(req, res) {

    models.Product.find({
        where: {
            id:req.body.id
        }
    }).then(function(product) {
        product.update({
                name_ar:req.body.name_ar,
                name_en:req.body.name_en,
                notes:req.body.notes,
                category_id:req.body.category_id
            },
            {
                where: {
                    id:req.body.id
                },
            })
        res.send(product);
    })
});

router.post('/destroy', function(req, res) {
    models.Product.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
});
router.get('/get', function (req, res) {
    console.log(models.Product);
    models.Product.findAll({
        include: [
            { model: models.Category },
            { model: models.MeasureUnit },
            { model: models.Image }
        ]
    })
        .then(function(category) {
            res.send(category);
        });
});

module.exports = router;