const {createDocumentService, allowReadService, viewDocumentService, editDocumentService,
    revokeReadPermissionService, allowWriteService, revokeWritePermissionService, allowShareService,
    deleteDocumentService
} = require("../service/documentService");

// Every Route in this controller will have /api/v1/document

/*
   * @desc To Create A Document
   * @port 8000
   * @route POST /create
   * @body
        {
            "text":"Document Text 2",
            "creatorEmail":"second@gmail.com",
            "isPublicDocument":false
        }
*/
exports.creatingDocument = async (req,res)=>{
    try{
        const {text,creatorEmail,isPublicDocument} = req.body;
        const savedDocument = await createDocumentService(text,creatorEmail,isPublicDocument);
        return res.status(201).json({
            CODE : "DOCUMENT_ADDED",
            message : "Document has been successfully added to the database",
            data : savedDocument
        });
    }catch (e) {
        console.log(e);
        return res.status(500).json({
            CODE : "ERROR",
            message : "An Error Occurred while Performing this task",
            error : JSON.stringify(e)
        });
    }
}
/*
   * @desc To Give Read Permission
   * @port 8000
   * @route POST /giveReadPermission
   * @body
        {
            "documentID":1,
            "givingReadPermissionTo":"fourth@gmail.com"
        }
*/
exports.giveReadPermission = async (req,res)=>{
    try{
        const beingAccessedBy = req.query.creatorEmail;
        const {documentID , givingReadPermissionTo} = req.body;
        await allowReadService(documentID,beingAccessedBy,givingReadPermissionTo);
        return res.status(200).json({
            CODE : "PERMISSION_GRANTED",
            message : "Successfully granted permission to access the document"
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You are not permitted to do this task",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
}
/*
   * @desc To give write permission to the user
   * @port 8000
   * @route POST /giveWritePermission
   * @body
        {
            "documentID":1,
            "givingReadPermissionTo":"fourth@gmail.com"
        }
*/
exports.giveWritePermission = async (req,res)=>{
    try{
        const beingAccessedBy = req.query.creatorEmail;
        const {documentID , givingReadPermissionTo} = req.body;
        await allowWriteService(documentID,beingAccessedBy,givingReadPermissionTo);
        return res.status(200).json({
            CODE : "PERMISSION_GRANTED",
            message : "Successfully granted permission to access the document"
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You are not permitted to do this task",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
}
/*
   * @desc To View Document
   * @port 8000
   * @route GET /viewDocument?userEmail=?&docID=?
*/
exports.viewDocument = async (req,res)=>{
    try{
        const beingAccessedBy = req.query.userEmail;
        const documentID = req.query.docID;
        const doc = await viewDocumentService(documentID,beingAccessedBy);
        return res.status(200).json({
            CODE : "PERMISSION_GRANTED",
            message : "Successfully granted permission to access the document",
            data : doc
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You are not permitted to do this task",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
}
/*
   * @desc To Edit Document
   * @port 8000
   * @route POST /editDocument?userEmail=?&docID=?
   * @body
    {
        "newText":"new Document Text"
    }
*/
 exports.editDocument = async (req,res)=>{
    try{
        const beingAccessedBy = req.query.userEmail;
        const documentID = req.query.docID;
        const newText = req.body.newText;
        const updatedDoc = await editDocumentService(documentID,beingAccessedBy,newText);
        return res.status(200).json({
            CODE : "PERMISSION_GRANTED",
            message : "Successfully granted permission to access the document",
            data : updatedDoc
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You are not permitted to do this task",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
 }
/*
   * @desc To Revoke Read Permission (if user has write permission and this end point is called so logically read end point will be removed as well)
   * @port 8000
   * @route POST /revokeReadPermission?creatorEmail=?
   * @body
   {
        "documentID":1,
        "takingPermissionFrom":"second@gmail.com"
    }
*/
 exports.revokeReadPermission = async (req,res)=>{
    try{
        const beingAccessedBy = req.query.creatorEmail;
        const {documentID , takingPermissionFrom} = req.body;
        await revokeReadPermissionService(documentID,beingAccessedBy,takingPermissionFrom);
        return res.status(200).json({
            CODE : "PERMISSION_REVOKED",
            message : "Successfully revoked permission of the read access the document"
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You are not permitted to do this task",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
 }
/*
   * @desc To Revoke Write Permission
   * @port 8000
   * @route POST /revokeWritePermission?creatorEmail=?
   * @body
   {
        "documentID":1,
        "takingPermissionFrom":"second@gmail.com"
    }
*/
exports.revokeWritePermission = async (req,res)=>{
    try{
        const beingAccessedBy = req.query.creatorEmail;
        const {documentID , takingPermissionFrom} = req.body;
        await revokeWritePermissionService(documentID,beingAccessedBy,takingPermissionFrom);
        return res.status(200).json({
            CODE : "PERMISSION_REVOKED",
            message : "Successfully revoked permission to access the document"
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You are not permitted to do this task",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
}
/*
   * @desc To allow sharing of the document
   * @port 8000
   * @route POST /allowShare
   * @body
   {
        "documentID":1,
        "givingPermissionTo":"second@gmail.com"
    }
*/
exports.allowShare = async (req,res)=>{
    try{
        const beingAccessedBy = req.query.userEmail;
        const {documentID , givingReadPermissionTo} = req.body;
        await allowShareService(documentID,beingAccessedBy,givingReadPermissionTo);
        return res.status(200).json({
            CODE : "SHARED_SUCCESSFULLY",
            message : "Document was successfully shared"
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You don't have permission to share this document",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
}
/*
   * @desc To Delete The Document
   * @port 8000
   * @route DELETE /deleteDocument?userEmail=?&docID=?
*/
exports.deleteDocument = async (req,res)=>{
    try{
        const beingDeletedBy = req.query.userEmail;
        const documentID = req.query.docID;
        await deleteDocumentService(documentID,beingDeletedBy);
        return res.status(200).json({
            CODE : "DELETED_SUCCESSFULLY",
            message : "Document was successfully Deleted"
        });
    }catch (e) {
        console.log(e);
        if(e.message==="NOT_PERMITTED")
            return res.status(403).json({
                CODE : "PERMISSION_NOT_GRANTED",
                message : "You don't have permission to share this document",
            });
        else
            return res.status(500).json({
                CODE : "ERROR",
                message : "An Error Occurred while Performing this task",
                error : JSON.stringify(e)
            });
    }
}