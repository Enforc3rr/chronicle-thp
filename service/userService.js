const userDatabase = require("../models/userModel");
const documentDatabase = require("../models/documentModel");

exports.addUserService = async (userEmail,name)=>{
    const savedUserData = await userDatabase.create({userEmail,name});
    return savedUserData;
}
exports.getUserDetailService = async (userEmail)=>{
    const userDetails = await userDatabase.findByPk(userEmail,{
        include : [{
            model : documentDatabase ,
            as : "Document"
        },{
            model: documentDatabase ,
            as : "ReadDocument"
        },{
            model: documentDatabase ,
            as : "WriteDocument"
        }]
    });
    return userDetails;
}