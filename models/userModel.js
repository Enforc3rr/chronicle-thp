const Sequelize = require("sequelize");
const database = require("../configuration/databaseConfiguration");

const UserModel = database.define("users",{
    userEmail : {
        type : Sequelize.STRING ,
        allowNull : false ,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull: false
    },
},{timeStamp : false});

module.exports = UserModel;