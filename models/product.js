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
            }
        }
    });

    return Product;
};