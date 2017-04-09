var models  = require('../models');
var express = require('express');
var router  = express.Router();

var bcrypt = require('bcryptjs');

router.post('/register', function(req, res) {
    models.User.create(req.body)
    .then(function(user) {
        if(user.type == models.User.customerCode())
        {
            return models.Customer.create({
              id:user.id,
              name:user.name
            });
        }
        else if(user.type == models.User.sellerCode())
        {
            return models.Seller.create({
                id:user.id,
                name:user.name
            });
        }
        else{
          return user;
        }
    }).then(function(obj) {
        res.send({obj:obj,type:req.body.type});
    });
});
router.post('/login', function(req, res) {
    models.User.find({
      where:{
          name: req.body.name,
          password: req.body.password
      }
    }).then(function(user) {
        if(user)
        {
          res.send(user);
        }
        else{
          res.send({error:"Authentication Faild"});
        }
    });
});


module.exports = router;
