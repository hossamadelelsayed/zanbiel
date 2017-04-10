"use strict";
var localize = require('../public/lang/lang');
//var bcrypt = require('bcryptjs');
//
var User;
 module.exports = function(sequelize, DataTypes) {
   User = sequelize.define("User", {
    name: {
      type:DataTypes.STRING,
      allowNull : false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull : false
    },
    type: {
      type:DataTypes.INTEGER,
      allowNull : false
    }
  }, {
      freezeTableName: true,
      // define the table's name
      tableName: 'users',
      hooks:{
        beforeCreate:function(user, options) {
            /*bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash("B4c0/\/", salt, function(err, hash) {
                    user.password = hash;
                });
            });*/

        }
      },
      classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      },
      adminCode:function(){
          return 0;
      },
      customerCode:function(){
          return 1;
      },
      sellerCode:function(){
          return 2;
      },
          registerUser :registerUser ,
          loginUser :loginUser
    }
  });

  return User;
};
var registerUser = function(req,res){
    this.create(req.body)
        .then(function(user) {
            if(user.type == User.customerCode())
            {
                return this.sequelize.import('./customer').create({
                    id:user.id,
                    name:user.name
                });
            }
            else if(user.type == User.sellerCode())
            {
                return this.sequelize.import('./seller').create({
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
};
var loginUser = function(req,res){
    this.find({
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
            res.send({error:localize.translate("Authentication Faild")});
        }
    });
};
