/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.post('/create', function(req, res) {
    models.Seller.create(req.body)
        .then(function(seller) {
            res.send(seller);
        });
});
router.post('/update', function(req, res) {

    models.Seller.update({
            name:req.body.name
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(seller) {
            res.send(seller);
        });
});
router.post('/destroy', function(req, res) {
    models.Seller.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
});

router.get('/get', function (req, res) {
    models.Seller.findAll()
        .then(function(seller) {
            res.send(seller);
        });
});
module.exports = router;