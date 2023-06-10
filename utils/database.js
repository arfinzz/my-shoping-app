const Sequdelize=require('sequelize');

const sequelize=new Sequdelize('node-complete','root','12345',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports=sequelize;