"use strict";
//var bcrypt = require('bcryptjs');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
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
      }
    }
  });

  return User;
};
