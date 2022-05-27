const User = require("../models/userModel");
const Document = require("../models/documentModel");

const relations = ()=>{
    User.hasMany(Document,{
        foreignKey:"fk_user",
        as : "Document",
        onDelete: 'CASCADE'
    });
    Document.belongsTo(User,{ as: "User", foreignKey: "fk_user" , onDelete: 'CASCADE' });

    User.belongsToMany(Document,{through : "USERS_READ", as : "ReadDocument" , foreignKey : "userID" , onDelete: 'CASCADE'});
    Document.belongsToMany(User,{through : "USERS_READ" , as : "ReadUser" , foreignKey : "documentID" , onDelete: 'CASCADE'});


    User.belongsToMany(Document,{through : "USERS_WRITE", as : "WriteDocument" , foreignKey : "userID" ,onDelete: 'CASCADE' });
    Document.belongsToMany(User,{through : "USERS_WRITE", as : "WriteUser" , foreignKey : "documentID" , onDelete: 'CASCADE'});
}


module.exports = relations;