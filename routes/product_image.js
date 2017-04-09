/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.Image.create({
        name:req.body.name,
        title:req.body.title,
        notes:req.body.notes,
        product_id :req.body.product_id
    })
        .then(function(image) {
            res.send(image);
        });
});
router.post('/update', function(req, res) {

    models.Image.update({
            name:req.body.name,
            title:req.body.title,
            notes:req.body.notes,
            product_id:req.body.product_id
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(image) {
            res.send(image);
        });
});

router.post('/destroy', function(req, res) {
    models.Image.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
});

router.get('/get', function (req, res) {
    models.Image.findAll()
        .then(function(measure) {
            res.send(measure);
        });
});
module.exports = router;