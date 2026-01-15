const {DataTypes} = require('sequelize');

const HP = require('../Config/hpconfig');

const janhvi = HP.define('ayush',{
    name : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    confirmpassword:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
  
    
});
module.exports= janhvi;
janhvi.sync({alter:true});