const router = require("express").Router();
const {
  addUser,
  login,
  getUserProfile,
  getAllUsers
} = require("../../controllers/user-controller");

router.route("/signup").post(addUser);

router.route("/login").post(login);

router.route("/user/:id").get(getUserProfile);

router.route("/users").get(getAllUsers);

module.exports = router;