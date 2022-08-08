const { Review, User } = require("../models");
var mongoose = require('mongoose');

const reviewController = {
  getReview({ params }, res) {
    Review.findOne({ _id: params.reviewId })
      .populate({
        path: "upvotes",
        select: "-__v",
      })
      .populate({
        path: "downvotes",
        select: "-__v",
      })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((review) => res.json(review))
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  },

  getReviews({ params }, res) {
    Review.find({ animeId: params.animeId })
    .populate({
        path: "upvotes",
        select: "-__v",
      })
    .populate({
    path: "downvotes",
    select: "-__v",
    })
    .populate({
    path: "comments",
    select: "-__v",
    })
    .select("-__v")
    .sort({ _id: -1 })
    .then(reviews => res.json(reviews))
    .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  },

  addReview(req, res) {
    Review.create({
      userId: req.body.userId,
      animeId: req.params.animeId,
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating
    })
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  updateReview({params, body}, res) {
    Review.findOneAndUpdate({ _id: params.reviewId }, body,
      { new: true })
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  removeReview({params, body}, res) {
    const rmReview = Review.findOneAndDelete({ _id: params.reviewId});
    const updateUser = User.findOneAndUpdate(
        { _id: body.userId},
        { $pull: { reviews: params.reviewId } },
        { new: true }
    );

    Promise.all([rmReview, updateUser])
    .then(updatedData => {
        if(!updatedData) {
            res.status(404).json({ message: "Invalid user or review _id." })
        }
        res.json(updatedData);
    })
    .catch(err => res.json(err));
  },

  upvote({ params, body }, res) {
    let id = mongoose.Types.ObjectId(body.userId);

    const upvote = Review.findOne({ _id: params.reviewId })
    .then(async review => {
        if(!review.upvotes.includes(id)) {
            return await Review.findByIdAndUpdate(
                { _id: params.reviewId },
                { $push: { upvotes: body.userId } },
                { new: true }
            );
        }
    });

    const checkDownvote = Review.findOne({ _id: params.reviewId })
    .then(async review => {
        if(review.downvotes.includes(id)) {
            return await Review.findByIdAndUpdate(
                { _id: params.reviewId },
                { $pull: { downvotes: body.userId } },
                { new: true }
            );
        }
    });

    Promise.all([upvote, checkDownvote])
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  downvote({ params, body }, res) {
    let id = mongoose.Types.ObjectId(body.userId);

    const downvote = Review.findOne({ _id: params.reviewId })
    .then(async review => {
        if(!review.downvotes.includes(id)) {
            return await Review.findByIdAndUpdate(
                { _id: params.reviewId },
                { $push: { downvotes: body.userId } },
                { new: true }
            );
        }
    });

    const checkUpvote = Review.findOne({ _id: params.reviewId })
    .then(async review => {
        if(review.upvotes.includes(id)) {
            return await Review.findByIdAndUpdate(
                { _id: params.reviewId },
                { $pull: { upvotes: body.userId } },
                { new: true }
            );
        }
    });

    Promise.all([downvote, checkUpvote])
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

};

module.exports = reviewController;
