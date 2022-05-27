const express = require("express");
const {creatingDocument, giveReadPermission, giveWritePermission, viewDocument, editDocument, revokeReadPermission,
    revokeWritePermission, allowShare, deleteDocument
} = require("../controller/documentController");
const router = express.Router();


router.route("/create")
    .post(creatingDocument);
router.route("/giveReadPermission")
    .post(giveReadPermission);
router.route("/giveWritePermission")
    .post(giveWritePermission);
router.route("/viewDocument")
    .get(viewDocument);
router.route("/editDocument")
    .post(editDocument);
router.route("/revokeReadPermission")
    .post(revokeReadPermission);
router.route("/revokeWritePermission")
    .post(revokeWritePermission);
router.route("/allowShare")
    .post(allowShare);
router.route("/deleteDocument")
    .delete(deleteDocument);

module.exports = router;
