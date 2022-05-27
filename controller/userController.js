const {addUserService, getUserDetailService} = require("../service/userService");
// Every Route in this controller will have /api/v1/user

/*
   * @desc To Add A user
   * @port 8000
   * @route POST /add
   * @body
        {
            "userEmail":"fifth@gmail.com",
            "name":"Name 5"
        }
*/
exports.addAUser = async (req,res)=>{
    try{
        const {userEmail,name} = req.body;
        const savedUser = await addUserService(userEmail,name);
        return res.status(201).json({
           CODE : "USER_ADDED",
           message : "user has been successfully added to the database",
           data : savedUser
        });
    }catch (e) {
        return res.status(500).json({
            CODE : "USER_NOT_ADDED",
            message : "user has not been added to the database",
            error : e
        });
    }
}
/*
   * @desc To Fetch user details including
   * @port 8000
   * @route GET /userDetails?email=?
*/
exports.fetchUserDetails = async (req,res)=>{
    try{
        const userEmail = req.query.email;
        const userData = await getUserDetailService(userEmail);
        if(userData)
            return res.status(200).json({
                CODE : "USER_FOUND",
                message : "user details has been successfully found",
                data : userData
            });
        else
            return res.status(200).json({
                CODE : "USER_NOT_FOUND",
                message : "No user detail is associated with this email",
            });
    }catch (e) {
        console.log(e);
        return res.status(500).json({
            CODE : "USER_NOT_FOUND",
            message : "user was not found",
            error : JSON.stringify(e)
        });
    }
}