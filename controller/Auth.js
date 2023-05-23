const bcrypt = require("bcrypt");
const User = require("../module/User");

//singnup
exports.singnup = async (req, res) => {
     try {
          //get data
          const {name, email, password, role} = req.body;

          //chack if user already exist.
          const existingUser = await User.findOne({email});
          if (existingUser) {
               return res.status(400).json({
                    success: false,
                    message: "User Already Exists"
               });
          }


          //password secure
          let hashedPassword;
          try {
               hashedPassword = await bcrypt.hash(password, 10);
          } 
          catch (error) {
               return res.status(500).json({
                    success: false,
                    message: "Error in Hashing Password"
               });
          }

          //create entery for user mongoose DB
          const user = await User.create({
               name,
               email,
               password: hashedPassword,
               role
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