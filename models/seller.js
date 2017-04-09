/**
 * Created by a4p2 on 4/5/2017.
 */
/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Seller = sequelize.define("Seller", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: true
        }
        ,name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'seller',
        classMethods: {
            associate: function(models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                Seller.belongsTo(models.User, {
                    foreignKey:'id',
                    allowNull: false
                });
            }
        }

    });

    return Seller;

};