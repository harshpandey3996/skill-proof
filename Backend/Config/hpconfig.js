const {Sequelize} = require('sequelize');

const HP =  new Sequelize ('harsh','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports=HP;