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
    req.check('category_id', localize.translate("Invalid ID")).isInt();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.Product.createProduct(req,res);
    }
    else{
        res.send(errors);
    }
});

router.post('/update', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('name_ar', localize.translate("Invalid Name")).notEmpty();
    req.check('name_en', localize.translate("Invalid Name")).notEmpty();
    req.check('category_id', localize.translate("Invalid ID")).isInt();
    req.check('id', localize.translate("Invalid ID")).isInt();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.Product.updateProduct(req,res);
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
        models.Product.destroyProduct(req,res);
    }
    else{
        res.send(errors);
    }
});
router.get('/get', function (req, res) {
    models.Product.getProduct(req,res);
});

module.exports = router;