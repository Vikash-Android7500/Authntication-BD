const express = require("express");
const router = express.Router();

const { login, singnup } = require("../controller/Auth");
const { auth, isStudant, isAdmin } = require("../middleware/auth");

router.post("/login", login);
router.post("/singnup", singnup);

// Protected Routes for Single Middleware.
router.get("/test", auth, (req, res) => {
     res.json({
          success: true,
          message: "Wellcom to Test Auth",
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

module.exports = router;