var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.Category.create({
      name_ar:req.body.name_ar,
      name_en:req.body.name_en,
      notes:req.body.notes
  })
  .then(function(category) {
    res.send(category);
  });
});
router.post('/update', function(req, res) {

        models.Category.find({
            where: {
                id:req.body.id
            }
        }).then(function(category) {
            category.update({
                name_ar:req.body.name_ar,
                name_en:req.body.name_en,
                notes:req.body.notes
            },
            {
                where: {
                    id:req.body.id
                },
            })
            res.send(category);
        })
});
router.post('/destroy', function(req, res) {
  models.Category.destroy({
    where: {
      id: req.body.id
    }
  }).then(function() {
    res.send({"status":1});
  });
});

router.get('/get', function (req, res) {
  models.Category.findAll()
  .then(function(category) {
    res.send(category);
  });
});


router.get('/with/products', function (req, res) {
    models.Category.findAll({
        include: [ models.Product ]
    })
        .then(function(category) {
            res.send(category);
        });
});


module.exports = router;
