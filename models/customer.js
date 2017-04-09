/**
 * Created by a4p2 on 4/5/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: true
        }
        ,name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        // define the table's name
        tableName: 'customer',
        classMethods: {
            associate: function(models) {
                // Using additional options like CASCADE etc for demonstration
                // Can also simply do Task.belongsTo(models.User);
                Customer.belongsTo(models.User, {
                    foreignKey:'id',
                    allowNull: false
                });
            }
        }

    });

    return Customer;

};