const Sequelize = require("sequelize");
const database = require("../configuration/databaseConfiguration");

const DocumentModel = database.define("document",{
    documentID : {
        type : Sequelize.INTEGER ,
        primaryKey : true ,
        allowNull : false ,
        autoIncrement : true
    },
    documentText : {
      type : Sequelize.STRING ,
      allowNull:  false
    },
    isPublicDocument : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    }
});

module.exports = DocumentModel;