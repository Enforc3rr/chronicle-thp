const Sequelize = require("sequelize");

const database = new Sequelize(process.env.DBNAME,process.env.DBUSERNAME,process.env.DBPASSWORD,{
    dialect : "mysql",
    host : process.env.DBHOST,
    port : process.env.DBPORT ,
    logging : false
});

module.exports = database;