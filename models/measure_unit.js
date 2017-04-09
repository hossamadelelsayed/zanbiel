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
            }
        }
    });

    return MeasureUnit;
};