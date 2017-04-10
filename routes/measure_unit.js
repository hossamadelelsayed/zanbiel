/**
 * Created by a4p2 on 4/5/2017.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var localize = require('../public/lang/lang');

router.post('/create', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('name_ar', localize.translate("Invalid Name")).notEmpty();
    req.check('name_en', localize.translate("Invalid Name")).notEmpty();
    req.check('product_id', localize.translate("Invalid ID")).isInt();
    req.check('price', localize.translate("Invalid Price")).isFloat();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.MeasureUnit.createMeasure(req,res);
    }
    else{
        res.send(errors);
    }
});

router.post('/update', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('id', localize.translate("Invalid ID")).isInt();
    req.check('name_ar', localize.translate("Invalid Name")).notEmpty();
    req.check('name_en', localize.translate("Invalid Name")).notEmpty();
    req.check('product_id', localize.translate("Invalid ID")).isInt();
    req.check('price', localize.translate("Invalid Price")).isFloat();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.MeasureUnit.updateMeasure(req,res);
    }
    else{
        res.send(errors);
    }
});

router.post('/destroy', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('id', localize.translate("Invalid ID")).isInt();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.MeasureUnit.destroyMeasure(req,res);
    }
    else{
        res.send(errors);
    }
});

router.get('/get', function (req, res) {
    models.MeasureUnit.getMeasure(req,res);
});

module.exports = router;