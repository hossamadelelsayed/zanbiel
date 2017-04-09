/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.post('/create', function(req, res) {
    models.Customer.create(req.body)
        .then(function(customer) {
            res.send(customer);
        });
});
router.post('/update', function(req, res) {

    models.Customer.update({
            name:req.body.name,
            address:req.body.address
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(customer) {
            res.send(customer);
        });
});
router.post('/destroy', function(req, res) {
    models.Customer.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
});

router.get('/get', function (req, res) {
    models.Customer.findAll()
        .then(function(customer) {
            res.send(customer);
        });
});
module.exports = router;