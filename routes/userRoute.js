const express = require("express");
const {addAUser, fetchUserDetails} = require("../controller/userController");
const router = express.Router();


router.route("/add")
    .post(addAUser);
router.route("/userDetails")
    .get(fetchUserDetails);


module.exports = router;
