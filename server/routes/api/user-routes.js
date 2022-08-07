const router = require("express").Router();
const {
  addUser,
  login,
  getUserProfile,
} = require("../../controllers/user-controller");

router.route("/signup").post(addUser);

router.route("/login").post(login);

router.route("/:id").get(getUserProfile);
