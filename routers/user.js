const express = require("express");
const router = express.Router();

const { login, singnup } = require("../controller/Auth");

// App.post("/login", login);
router.post("/singnup", singnup);

module.exports = router;