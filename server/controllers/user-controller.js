const { User } = require("../models");
const { signToken } = require("../utils/auth.js");
const ObjectId = require("mongoose").Types.ObjectId;
const paramsConfig = require("../utils/params-config");
const fs = require("fs");

const userController = {
  // signup
  addUser(req, res) {
    User.create(req.body)
      .then((user) => {
        const token = signToken(user);
        res.json({ token: token, user: user });
      })
      .catch((err) => res.json(err));
  },
  // login
  login(req, res) {
    console.log(req.body);
    User.findOne({ email: req.body.email })
      .then(async (user) => {
        if (!user) {
          throw new Error("Incorrect credentials");
        }
        const correctPw = await user.isCorrectPassword(req.body.password);

        if (!correctPw) {
          throw new Error("Incorrect credentials");
        }

        const token = signToken(user);

        res.json({ token: token, user: user });
      })
      .catch((err) => res.json(err));
  },
  // profile
  getUserProfile({ params }, res) {
    User.findOne({ username: params.username })
      .populate({
        path: "reviews",
        select: "-__v",
      })
      .populate({
        path: "watchLater",
        select: "-__v",
      })
      .populate({
        path: "favorites",
        select: "-__v",
      })
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  },
  // all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "savedAnime",
        select: "-__v",
      })
      .populate({
        path: "reviews",
        select: "-__v",
      })
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  },

  updateProfilePhoto({ body, params, headers }, res) {
    if (headers.authorization) {
      let img = fs.readFileSync(body.file.path);
      let encodedImg = img.toString("base64");
      let finalImg = {
        contentType: body.file.mimeType,
        image: new Buffer(encodedImg, "base64"),
      };
      image.create(finalImg, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result.img.Buffer);
          User.findOneAndUpdate(
            { username: params.username },
            { profilePicture: finalImg.image },
            { new: true }
          )
            .then((user) => res.json(user))
            .catch((err) => res.send(err));
        }
      });
    }
  },
};

module.exports = userController;
