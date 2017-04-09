/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        name_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name_ar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT
        }
    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'category',
        classMethods: {
            associate: function (models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                Category.hasMany(models.Product, {
                    foreignKey: 'category_id'
                });
            }
        }
    });
    return Category;
};