var models  = require('../models');
var express = require('express');
var router  = express.Router();
var localize = require('../public/lang/lang');
var bcrypt = require('bcryptjs');

router.post('/register', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('type', localize.translate("Invalid ID")).isInt();
    req.check('password', localize.translate("Invalid Password")).notEmpty();
    req.check('name', localize.translate("Invalid Name")).notEmpty();
    req.check('email', localize.translate("Invalid Email")).isEmail();
    req.check('mobile', localize.translate("Invalid Mobile")).notEmpty();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.User.registerUser(req,res);
    }
    else{
        res.send(errors);
    }
});
router.post('/login', function(req, res) {
    if(req.body.lang)
        localize.setLocale(req.body.lang);
    req.check('password', localize.translate("Invalid Password")).notEmpty();
    req.check('email', localize.translate("Invalid Email")).isEmail();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.User.loginUser(req,res);
    }
    else{
        res.send(errors);
    }
});


module.exports = router;
