const {
  register,
  login,
  resetPassword,
  googleLogin,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/google-login", googleLogin);

module.exports = router;
