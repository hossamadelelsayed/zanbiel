/**
 * Created by a4p2 on 4/6/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var ODetails = sequelize.define("ODetails", {
        quantity:{
            type : DataTypes.FLOAT,
            allowNull : false
        },
        price:{
            type : DataTypes.FLOAT,
            allowNull : false
        },
        product_id:{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        order_id:{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        measure_id:{
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'order_details',
        classMethods: {
            associate: function(models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                ODetails.belongsTo(models.Product, {
                    foreignKey:'product_id',
                    allowNull: false
                });
                ODetails.belongsTo(models.Order, {
                    foreignKey:'order_id',
                    allowNull: false
                });
                ODetails.belongsTo(models.MeasureUnit, {
                    foreignKey:'measure_id',
                    allowNull: false
                });
            },
            createOdetails : createOdetails,
            updateOdetails : updateOdetails,
            destroyOdetails : destroyOdetails,
            getOdetails : getOdetails
        }
    });

    return ODetails;
};


var createOdetails = function(req,res){
    this.create(req.body)
        .then(function(odetails) {
            res.send(odetails);
        });
};
var updateOdetails = function(req,res){
    this.update(
        req.body,
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(odetails) {
            res.send(odetails);
        });
};
var destroyOdetails = function(req,res){
    this.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
};
var getOdetails = function(req,res){
    this.findAll({
        where: {
            order_id: req.params.order_id
        },
        include: [
            { model: this.sequelize.import('./product') },
            { model: this.sequelize.import('./measure_unit') }
        ]
    }).then(function(odetails) {
        res.send(odetails);
    });
};







