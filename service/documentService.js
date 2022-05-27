const documentDatabase = require("../models/documentModel");
const userDatabase = require("../models/userModel");

exports.createDocumentService = async (text,documentBeingAddedBy,isPublicDocument)=>{
    const user = await userDatabase.findByPk(documentBeingAddedBy);
    const savedDocumentData = await user.createDocument({documentText : text,isPublicDocument : isPublicDocument});
    return savedDocumentData;
}

exports.allowReadService = async (documentID,beingAccessedBy,givingReadPermissionTo)=>{
    const document = await documentDatabase.findByPk(documentID);
    if(document.fk_user !== beingAccessedBy)
        throw new Error("NOT_PERMITTED");
    const fetchUserToGivePermissionTo = await userDatabase.findByPk(givingReadPermissionTo);
    await document.addReadUser(fetchUserToGivePermissionTo);
}

exports.revokeReadPermissionService = async (documentID , beingAccessedBy , takeReadPermissionFrom)=>{
    const document = await documentDatabase.findByPk(documentID);
    if(document.fk_user !== beingAccessedBy)
        throw new Error("NOT_PERMITTED");
    const fetchUserTakeReadPermissionFrom = await userDatabase.findByPk(takeReadPermissionFrom);
    const hasWritePermission = await document.hasWriteUser(fetchUserTakeReadPermissionFrom);
    if(hasWritePermission)
        await document.removeWriteUser(fetchUserTakeReadPermissionFrom);
    await document.removeReadUser(fetchUserTakeReadPermissionFrom);
}

exports.allowWriteService = async (documentID,beingAccessedBy,givingReadPermissionTo)=>{
    const document = await documentDatabase.findByPk(documentID);
    if(document.fk_user !== beingAccessedBy)
        throw new Error("NOT_PERMITTED");
    const fetchUserToGivePermissionTo = await userDatabase.findByPk(givingReadPermissionTo);
    const hasReadPermission = await document.hasReadUser(fetchUserToGivePermissionTo);
    if(!hasReadPermission)
        await document.addReadUser(fetchUserToGivePermissionTo);
    await document.addWriteUser(fetchUserToGivePermissionTo);
}

exports.revokeWritePermissionService = async (documentID , beingAccessedBy , takeReadPermissionFrom)=>{
    const document = await documentDatabase.findByPk(documentID);
    if(document.fk_user !== beingAccessedBy)
        throw new Error("NOT_PERMITTED");
    const fetchUserTakeReadPermissionFrom = await userDatabase.findByPk(takeReadPermissionFrom);

    await document.removeWriteUser(fetchUserTakeReadPermissionFrom);
}

exports.viewDocumentService = async (documentID , beingAccessedBy)=>{
    const document = await documentDatabase.findByPk(documentID,{
        include : [
            {
                model : userDatabase ,
                as : "ReadUser" ,
                attributes : ["userEmail","name"]
            },
            {
                model : userDatabase,
                as : "WriteUser",
                attributes : ["userEmail","name"]
            }
        ]
    });
    if(document.isPublicDocument)
        return document;
    const beingAccessByData = await userDatabase.findByPk(beingAccessedBy);
    const hasReadPermission = await document.hasReadUser(beingAccessByData);
    if(hasReadPermission || document.fk_user === beingAccessedBy)
        return document;
    throw new Error("NOT_PERMITTED");
}

exports.editDocumentService = async (documentID , beingAccessedBy , newText)=>{
    const document = await documentDatabase.findByPk(documentID);
    const beingAccessByData = await userDatabase.findByPk(beingAccessedBy);
    const hasReadWritePermission = await document.hasWriteUser(beingAccessByData);
    if(hasReadWritePermission || document.fk_user === beingAccessedBy){
        await documentDatabase.update({documentText : newText},{
            where : {
                documentID : documentID
            }
        });
        return newText; // returns 1
    } else
        throw new Error("NOT_PERMITTED");
}

exports.allowShareService = async (documentID,beingAccessedBy,givingReadPermissionTo)=>{
    const document = await documentDatabase.findByPk(documentID);
    const beingAccessedByData = await userDatabase.findByPk(beingAccessedBy);
    const hasRWPermission = await document.hasWriteUser(beingAccessedByData);
    if(!hasRWPermission)
        throw new Error("NOT_PERMITTED");
    const fetchUserToGivePermissionTo = await userDatabase.findByPk(givingReadPermissionTo);
    await document.addReadUser(fetchUserToGivePermissionTo);
}

exports.deleteDocumentService = async (documentID , beingDeletedBy)=>{
    const document = await documentDatabase.findByPk(documentID);
    if(document.fk_user !== beingDeletedBy)
        throw new Error("NOT_PERMITTED");
    await document.destroy({where : {documentID : documentID}});
}

