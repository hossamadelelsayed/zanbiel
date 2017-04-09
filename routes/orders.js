/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.post('/create', function(req, res) {
    models.Order.create(req.body)
        .then(function(order) {
            res.send(order);
        });
});

router.post('/update', function(req, res) {
    models.Order.update(
        {
            seller_id:req.body.seller_id,
            customer_id:req.body.customer_id,
            delivery_date : req.body.delivery_date,
            payment_method : req.body.payment_method
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(order) {
            res.send(order);
        });
});
router.post('/destroy', function(req, res) {
    models.Order.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
});
router.get('/get', function (req, res) {
    console.log(models.Order);
    models.Order.findAll({
        include: [
            { model: models.Seller },
            { model: models.Customer }
        ]
    })
        .then(function(orders) {
            res.send(orders);
        });
});
router.get('/get/:order_id', function (req, res) {
    models.Order.find({
        where: {
            id: req.params.order_id
        },
        include: [
            { model: models.Seller },
            { model: models.Customer },
            { model: models.ODetails }
        ]
    }).then(function(order) {
        res.send(order);
    });
});
module.exports = router;