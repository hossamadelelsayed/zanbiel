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
            }
        }
    });

    return Order;

};