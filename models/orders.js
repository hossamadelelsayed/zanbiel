/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        total: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        status:{
            type : DataTypes.STRING,
            allowNull : false ,
        },
        payment_method:{
            type : DataTypes.STRING,
            allowNull : false ,
        },
        delivery_date:{
            type : DataTypes.DATE,
            allowNull : false ,
        },
        customer_id:{
            type : DataTypes.INTEGER,
            allowNull : false ,
        }
    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'orders',
        classMethods: {
            associate: function(models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                Order.belongsTo(models.Seller, {
                    foreignKey:'seller_id',
                    allowNull: true
                });
                Order.belongsTo(models.Customer, {
                    foreignKey:'customer_id',
                    allowNull: false
                });
                Order.hasMany(models.ODetails , {
                    foreignKey:'order_id'
                });
            },
            createOrder : createOrder,
            updateOrder : updateOrder,
            destroyOrder : destroyOrder,
            getOrder : getOrder,
            getOrderByID : getOrderByID

        }
    });

    return Order;

};


var createOrder = function(req,res){
    this.create(req.body)
        .then(function(order) {
            res.send(order);
        });
};
var updateOrder = function(req,res){
    this.update(
        {
            seller_id:req.body.seller_id,
            customer_id:req.body.customer_id,
            delivery_date : req.body.delivery_date,
            payment_method : req.body.payment_method
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(order) {
            res.send(order);
        });
};
var destroyOrder = function (req,res) {
    this.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
};
var getOrder = function (req,res) {
    this.findAll({
        include: [
            { model: this.sequelize.import('./seller') },
            { model: this.sequelize.import('./customer') }
        ]
    })
        .then(function(orders) {
            res.send(orders);
        });
};
var getOrderByID = function(req,res){
    this.find({
        where: {
            id: req.params.order_id
        },
        include: [
            { model: this.sequelize.import('./seller') },
            { model: this.sequelize.import('./customer') },
            { model: this.sequelize.import('./order_details') }
        ]
    }).then(function(order) {
        res.send(order);
    });
};