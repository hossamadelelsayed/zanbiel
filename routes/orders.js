/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var localize = require('../public/lang/lang');
var helper = require('../helpers/helper');

router.post('/create', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('payment_method', localize.translate("Invalid Payment")).notEmpty();
    req.check('status', localize.translate("Invalid Status")).notEmpty();
    req.check('customer_id', localize.translate("Invalid ID")).isInt();
    req.check('delivery_date', localize.translate("Invalid Date")).isDate();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.Order.createOrder(req,res);
    }
    else{
        res.send({
            error : helper.errorHandling(errors)
        });
    }
});

router.post('/update', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('id', localize.translate("Invalid ID")).isInt();
    req.check('payment_method', localize.translate("Invalid Payment")).notEmpty();
    req.check('delivery_date', localize.translate("Invalid Date")).isDate();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.Order.updateOrder(req,res);
    }
    else{
        res.send({
            error : helper.errorHandling(errors)
        });
    }
});
router.post('/destroy', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('id', localize.translate("Invalid ID")).isInt();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.Order.destroyOrder(req,res);
    }
    else{
        res.send({
            error : helper.errorHandling(errors)
        });
    }
});
router.get('/get', function (req, res) {
    models.Order.getOrder(req,res);
});
router.get('/get/:order_id', function (req, res) {
    models.Order.getOrderByID(req,res);
});
module.exports = router;