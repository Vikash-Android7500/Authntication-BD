const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected Successfully (-_-)");
    })
    .catch((error) => {
      console.log("DB Facing Connection Issues (^_^)");
      console.error(error);
      process.exit(1);
    });
};


