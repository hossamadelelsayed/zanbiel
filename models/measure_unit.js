/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var MeasureUnit = sequelize.define("MeasureUnit", {
        name_en:{
            type : DataTypes.STRING,
            allowNull : false ,
        },
        name_ar:{
            type : DataTypes.STRING,
            allowNull : false ,
        },
        price:{
            type : DataTypes.FLOAT,
            allowNull : false ,
        },
        product_id:{
            type : DataTypes.INTEGER,
            allowNull : false ,
        }
    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'measure_unit',
        classMethods: {
            associate: function(models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                MeasureUnit.belongsTo(models.Product, {
                    foreignKey:'product_id',
                    allowNull: false
                });
            },
            createMeasure : createMeasure ,
            updateMeasure : updateMeasure ,
            destroyMeasure : destroyMeasure ,
            getMeasure : getMeasure
        }
    });

    return MeasureUnit;
};

var createMeasure = function(req,res){
    this.create({
        name_ar:req.body.name_ar,
        name_en:req.body.name_en,
        price:req.body.price,
        product_id :req.body.product_id
    })
        .then(function(measure) {
            res.send(measure);
        });
};
var updateMeasure = function(req,res){
    this.update({
            name_ar:req.body.name_ar,
            name_en:req.body.name_en,
            notes:req.body.notes,
            category_id:req.body.category_id
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(measure) {
            res.send(measure);
        });
};
var destroyMeasure = function(req,res){
    this.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
};
var getMeasure = function(req,res){
    this.findAll({
        include: [ this.sequelize.import('./product') ]
    })
        .then(function(measure) {
            res.send(measure);
        });
};