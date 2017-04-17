/**
 * Created by a4p2 on 4/6/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var localize = require('../public/lang/lang');
var helper = require('../helpers/helper');

router.post('/create', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('price', localize.translate("Invalid Price")).isFloat();
    req.check('quantity', localize.translate("Invalid Quantity")).isFloat();
    req.check('measure_id', localize.translate("Invalid ID")).isInt();
    req.check('product_id', localize.translate("Invalid ID")).isInt();
    req.check('order_id', localize.translate("Invalid ID")).isInt();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.ODetails.createOdetails(req,res);
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
    var errors = req.validationErrors();
    if(!errors)
    {
        models.ODetails.updateOdetails(req,res);
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
        models.ODetails.destroyOdetails(req,res);
    }
    else{
        res.send({
            error : helper.errorHandling(errors)
        });
    }
});
router.get('/get/:order_id', function (req, res) {
    models.ODetails.getOdetails(req,res);
});
module.exports = router;