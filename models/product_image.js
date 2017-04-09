/**
 * Created by a4p2 on 4/5/2017.
 */
/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";

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
            }
        }
    });

    return Image;
};