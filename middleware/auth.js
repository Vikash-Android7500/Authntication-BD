const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
     try {
      // console.log("cookie", req.cookies.token);
      // console.log("body", req.body.token);
      // console.log("header", req.header("Authorization"));
        //extract JWT Token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Baerer", "");
        
        if (!token || token === undefined) {
            return res.status(401).json({
               success: false,
               message: "Token Missing",
            });
        }

        //Verify the token 
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          req.user = payload;
        } 
        catch (error) {
          return res.status(401).json({
            success: false,
            message: "Token is invalide",
          });
        }
        next();
     } 
     catch (error) {
         return res.status(500).json({
           success: false,
           message: "Something went wrong while verifying the token",
         });
     }
}

exports.isStudant = (req, res, next) => {
   try {
      if (req.user.role !== "Student") {
        return res.status(401).json({
          success: false,
          message: "This is a Protected route for Students",
        });
      }
      next();
   } 
   catch (error) {
     return res.status(500).json({
         success: false,
         message: "User Role is Not matching isStudent",
     });
   }
}

exports.isAdmin = (req, res, next) => {
   try {
     if (req.user.role !== "Admin") {
       return res.status(401).json({
         success: false,
         message: "This is a Protected route for Admin",
       });
     }
     next();
   }
   catch (error) {
     return res.status(500).json({
       success: false,
       message: "User Role is Not matching isAdmin",
     });
   }
}

