const {
  register,
  login,
  resetPassword,
  googleLogin,
} = require("../controllers/auth.controller");
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { stats } = require("../controllers/userSignIn.controller");
const { uploadUser } = require("../lib/multer");
const {
  verifyAdminAndToken,
  verifyUserAndToken,
} = require("../middlewares/token");

const router = require("express").Router();

// hna nheto image wehda berk 1
router.post("/register", uploadUser.single("image"), register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/google-login", googleLogin);
router.get("/all-users", verifyAdminAndToken, getAllUsers);
router.get("/stats", verifyAdminAndToken, stats);
// hna ndiro update l image hadik m3a user info 2
router.put(
  "/user/update/:id",
  uploadUser.single("image"),
  verifyUserAndToken,
  updateUser
);
router.delete("/user/delete/:id", verifyAdminAndToken, deleteUser);

module.exports = router;
