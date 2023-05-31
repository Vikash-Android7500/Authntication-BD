const bcrypt = require("bcrypt");
const User = require("../module/User");
const jwt = require("jsonwebtoken");
// const { options } = require("../routers/user");
require("dotenv").config();

/* Singnup */
exports.singnup = async (req, res) => {
     try {
       //get data
       const { name, email, password, role } = req.body;

       //chack if user already exist.
       const existingUser = await User.findOne({ email });
       if (existingUser) {
         return res.status(400).json({
           success: false,
           message: "User Already Exists",
         });
       }
      
       //validation on All details
       else if (!name || !email || !password || !role) {
         return res.status(400).json({
           success: false,
           message: "Please Fill All The Details Not Singnup",
         });
       }

       //password secure
       let hashedPassword;
       try {
         hashedPassword = await bcrypt.hash(password, 10);
       } 
       catch (error) {
         return res.status(404).json({
           success: false,
           message: "Error in Hashing Password",
         });
       }

       //create entery for user mongoose DB
       const user = await User.create({
         name,
         email,
         password: hashedPassword,
         role,
       });

       return res.status(200).json({
         success: true,
         message: "User Successfully Singn'up",
       });
     }
     catch(error) {
          console.error(error);
          return res.status(500).json({
               success: false,
               message: "User cannot be registered, Please try again ?"
          });
     }
}


/* Login */

exports.login = async (req, res) => {
     try {
       //data fetch
       const { email, password } = req.body;
       //validation on email and password
       if (!email || !password) {
         return res.status(400).json({
           success: false,
           message: "Please Fill All the details carefully ?",
         });
       }

       //chack for Registered user
       let user = await User.findOne({ email });
       //if not a registered user
       if (!user) {
         return res.status(401).json({
           success: false,
           message: "User Not Registered ?",
         });
       }

       //payload
       const payload = {
         email: user.email,
         id: user._id,
         role: user.role,
       };

       //options
       const options = {
         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
         httpOnly: true,
       };

       //Verify Password & Generate a JWT Token.
       if (await bcrypt.compare(password, user.password)) {
         //password match
         let token = jwt.sign(payload, process.env.JWT_SECRET, {
           expiresIn: "2h",
         });

         user = user.toObject();
         user.token = token;
         user.password = undefined;

         res.cookie("VK-cookie", token, options).status(200).json({
           success: true,
           token,
           user,
           message: "User Successfully Login OK 200 status",
         });
       } 
       else {
         // password do not match
         return res.status(403).json({
           success: false,
           message: "Password Incorrect",
         });
       }
     } 
     catch (error) {
           console.error(error);
           return res.status(500).json({
             success: false,
             message: "User cannot be Login Error",
           });
     }
}