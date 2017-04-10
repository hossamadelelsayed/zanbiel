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
            }
        }
    });

    return ODetails;
};