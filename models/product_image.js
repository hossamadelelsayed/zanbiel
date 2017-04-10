/**
 * Created by a4p2 on 4/5/2017.
 */
/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";
var fs = require("fs");
var path = require("path");
module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define("Image", {
        name:{
            type : DataTypes.TEXT,
            allowNull : false ,
        },
        title:{
            type : DataTypes.STRING
        },
        notes:{
            type : DataTypes.TEXT
        },
        product_id:{
            type : DataTypes.INTEGER,
            allowNull : false ,
        }

    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'product_image',
        classMethods: {
            associate: function(models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                Image.belongsTo(models.Product, {
                    foreignKey:'product_id',
                    allowNull: false
                });
            },
            createImage : createImage ,
            updateImage : updateImage ,
            destroyImage : destroyImage ,
            getImage : getImage
        }
    });

    return Image;
};

var createImage = function(req,res) {
    var image = req.body.name;
    var bitmap = new Buffer(image, 'base64');
    var fileName = new Date()+".png";
    fs.writeFileSync("../public/images/"+fileName, bitmap);
    this.create({
        name:fileName,
        title:req.body.title,
        notes:req.body.notes,
        product_id :req.body.product_id
    })
        .then(function(image) {

            res.send(image);
        });
};
var updateImage = function(req,res) {
    this.update({
            name:req.body.name,
            title:req.body.title,
            notes:req.body.notes,
            product_id:req.body.product_id
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(image) {
            res.send(image);
        });
};
var destroyImage = function(req,res) {
    this.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
};
var getImage = function(req,res) {
    this.findAll()
        .then(function(measure) {
            res.send(measure);
        });
};