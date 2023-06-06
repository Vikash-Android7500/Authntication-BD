const express = require("express");
const router = express.Router();
const User = require("../module/User");

const { login, singnup } = require("../controller/Auth");
const { auth, isStudant, isAdmin } = require("../middleware/auth");

router.post("/login", login);
router.post("/singnup", singnup);

// Protected Routes for Single Middleware.
router.get("/test", auth, (req, res) => {
     res.json({
       success: true,
       message: "Wellcom to Test Auth Protected Routes ('_')",
     });
});

router.get("/student", auth, isStudant, (req, res) => {
     res.json({
          success: true,
          message: "Wellcom to prodect Router in Studant",
     });
});

router.get("/admin", auth, isAdmin, (req, res) => {
     res.json({
          success: true,
          message: "Wellcom to Admin ",
     });
});
 
router.get("/getEmail", auth, async (req, res) => {

     try {
        const id = req.user.id;
        const user = await User.findById(id);
        
        res.status(200).json({
          success: true,
          user: user,
          message: "Wellcome to the Email router",
        });
     } 
     catch (error) {
        res.status(500).json({
          success: false,
          error: error.message,
          message: "Wellcome to the Email router Error",
        });
     }
    

})

module.exports = router;