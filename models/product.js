/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        name_en:{
            type : DataTypes.STRING,
            allowNull : false ,
        },
        name_ar:{
            type : DataTypes.STRING,
            allowNull : false ,
        },
        notes:{
            type : DataTypes.TEXT
        },
        category_id:{
            type : DataTypes.INTEGER,
            allowNull : false ,
        }
    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'product',
        classMethods: {
            associate: function(models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                Product.belongsTo(models.Category, {
                    onDelete: "RESTRICT",
                    foreignKey:
                    {
                        name: 'category_id',
                        allowNull: false
                    }
                });
                Product.hasMany(models.MeasureUnit, {
                    foreignKey:'product_id'
                });
                Product.hasMany(models.Image , {
                    foreignKey:'product_id'
                });
            },
            createProduct : createProduct ,
            updateProduct : updateProduct ,
            destroyProduct : destroyProduct ,
            getProduct : getProduct
        }
    });

    return Product;
};



var createProduct = function(req,res) {
    this.create({
        name_ar:req.body.name_ar,
        name_en:req.body.name_en,
        notes:req.body.notes,
        category_id:req.body.category_id
    })
        .then(function(product) {
            res.send(product);
        });
};
var updateProduct = function(req,res) {
    this.find({
        where: {
            id:req.body.id
        }
    }).then(function(product) {
        product.update({
                name_ar:req.body.name_ar,
                name_en:req.body.name_en,
                notes:req.body.notes,
                category_id:req.body.category_id
            },
            {
                where: {
                    id:req.body.id
                },
            })
        res.send(product);
    });
};
var destroyProduct = function(req,res){
    this.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
} ;

var getProduct = function(req,res){
    this.findAll({
        include: [
            { model: this.sequelize.import('./category') },
            { model: this.sequelize.import('./measure_unit') },
            { model: this.sequelize.import('./product_image') }
        ]
    })
        .then(function(category) {
            res.send(category);
        });
};