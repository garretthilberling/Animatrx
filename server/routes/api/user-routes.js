const router = require("express").Router();
const multer = require("multer");
const {
  addUser,
  login,
  getUserProfile,
  getAllUsers,
  updateProfilePhoto
} = require("../../controllers/user-controller");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

// using multer to handle image-to-URL conversion
const upload = multer({ storage }).single("image"); // image is the key

router.route("/signup").post(addUser);

router.route("/login").post(login);

router.route("/user/:username")
.get(getUserProfile);

router.route("/user/:username/uploadphoto", upload)
.post(updateProfilePhoto);


router.route("/users").get(getAllUsers);

module.exports = router;