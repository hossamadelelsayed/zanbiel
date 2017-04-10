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
            },
        createSeller : createSeller,
        updateSeller : updateSeller,
        destroySeller : destroySeller,
        getSeller : getSeller,
        }

    });

    return Seller;

};


var createSeller = function(req,res){
    this.create(req.body)
        .then(function(seller) {
            res.send(seller);
        });
};
var updateSeller = function(req,res){
    this.update({
            name:req.body.name
        },
        {
            where: {
                id:req.body.id
            }
        })
        .then(function(seller) {
            res.send(seller);
        });
};
var destroySeller = function(req,res){
    this.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
};
var getSeller = function(req,res){
    this.findAll()
        .then(function(seller) {
            res.send(seller);
        });
};