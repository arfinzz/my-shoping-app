const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Product=sequelize.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.BOOLEAN,
        allowNull:false
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imageurl:{
        type:Sequelize.STRING,
        allowNull:false
    }

});

module.exports=Product;