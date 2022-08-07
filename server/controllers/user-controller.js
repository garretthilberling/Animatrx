const { User } = require("../models");
const { signToken } = require("../utils/auth.js");
const ObjectId = require('mongoose').Types.ObjectId;

const userController = {
  // signup
  addUser(req, res) {
    User.create(req.body)
      .then((user) => {
        const token = signToken(user);
        res.json({token: token, user: user});
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

        res.json({token: token, user: user});
      })
      .catch((err) => res.json(err));
  },
  // profile
  getUserProfile({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "savedAnime",
        select: "-__v",
      })
      .populate({
        path: "reviews",
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
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    });
  }
};

module.exports = userController;
