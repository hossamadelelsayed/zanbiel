var express = require('express');
var router  = express.Router();
var models  = require('../models');
var localize = require('../public/lang/lang');
var helper = require('../helpers/helper');

router.post('/create', function(req, res) {
  if(req.body.lang)
    localize.setLocale(req.body.lang);
  req.check('name_ar', localize.translate("Invalid Name")).notEmpty();
  req.check('name_en', localize.translate("Invalid Name")).notEmpty();
  var errors = req.validationErrors();
  if(!errors)
  {
      models.Category.createCategory(req,res);
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
    req.check('name_ar', localize.translate("Invalid Name")).notEmpty();
    req.check('name_en', localize.translate("Invalid Name")).notEmpty();
    req.check('id', localize.translate("Invalid ID")).isInt();
    var errors = req.validationErrors();
    if(!errors)
    {
        models.Category.updateCategory(req,res);
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
        models.Category.destroyCategory(req,res);
    }
    else{
        res.send({
            error : helper.errorHandling(errors)
        });
    }
});

router.get('/get', function (req, res) {
    models.Category.getCategories(req,res);
});


router.get('/with/products', function (req, res) {
    var name= 'name_en';
    if(req.query.lang && req.query.lang == 'ar')
    {
        name= 'name_ar';
    }
    models.Category.findAll({
        attributes: ['id',[name, 'name']],
        include: [
            {
                model : models.Product,
                attributes: ['id','category_id',[name, 'name']],
                include: [
                    {
                        model : models.MeasureUnit ,
                        attributes: ['id','price',[name, 'name']]
                    },
                    {
                        model : models.Image
                    }
                ]
            }]
    })

        .then(function(category) {
            res.send(category);
        });
   /* models.Category.getCategoriesWithProduct(req,res);*/
});


module.exports = router;
