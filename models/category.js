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
            },
            createCategory : createCategory,
            updateCategory : updateCategory,
            destroyCategory : destroyCategory,
            getCategories : getCategories,
            getCategoriesWithProduct:getCategoriesWithProduct
        }
    });
    return Category;
};
var createCategory = function(req,res)
{
    this.create({
        name_ar:req.body.name_ar,
        name_en:req.body.name_en,
        notes:req.body.notes
    })
        .then(function(category) {
             res.send(category);
        });
};
var updateCategory = function(req,res){
    this.find({
        where: {
            id:req.body.id
        }
    }).then(function(category) {
        category.update({
                name_ar:req.body.name_ar,
                name_en:req.body.name_en,
                notes:req.body.notes
            },
            {
                where: {
                    id:req.body.id
                },
            })
        res.send(category);
    })
};
var destroyCategory = function(req,res){
    this.destroy({
        where: {
            id: req.body.id
        }
    }).then(function() {
        res.send({"status":1});
    });
};
var getCategories = function(req,res){
    this.findAll()
        .then(function(category) {
            res.send(category);
        });
};
var getCategoriesWithProduct= function(req,res){
    var name= 'name_en';
    if(req.query.lang && req.query.lang == 'ar')
    {
        name= 'name_ar';
    }
        this.findAll({
        attributes: [[name, 'name']],
        include: [
            { model: this.sequelize.import('./product'),
              attributes: ['id','category_id',[name, 'name']]
            },

        ]
    })
        .then(function(category) {
            res.send(category);
        });
};
