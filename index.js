const express = require("express");
require("./config/database").connect();
require("dotenv").config();
const user = require("./routers/user");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/v1", user);

app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`);
});