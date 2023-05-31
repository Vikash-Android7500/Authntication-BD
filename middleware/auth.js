const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
     try {
        //extract JWT Token
        const token = req.body.token;
        
        if (!token) {
            return res.status(401).json({
               success: false,
               message: "Token Missing",
            });
        }

        //Verify the token 
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          console.log(payload);
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
         return res.status(401).json({
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

  // "name": "Code Editer",
  // "email": "visualStudio123.vk@gmail.com",
  // "password": "123456",
  // "role": "Student"