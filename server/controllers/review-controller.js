const { Review, User } = require("../models");

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
    .then(reviews => res.json(reviews))
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
    .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  },

  addReview({ params, body, userId }, res) {
    Review.create(params.animeId, body, userId)
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  updateReview({params, body}, res) {
    Review.findOneAndUpdate({ _id: params.reviewId }, body)
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  removeReview({params}, res) {
    const rmReview = Review.findOneAndDelete({ _id: params.reviewId});
    const updateUser = User.findOneAndUpdate(
        { _id: params.userId},
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

  upvote({ params, userId }, res) {
    const upvote = Review.findOneAndUpdate(
        { _id: params.reviewId },
        { $push: { upvotes: userId } },
        { new: true },
    );

    const checkDownvote = Review.findOne({ _id: params.reviewId })
    .then(async review => {
        if(review.downvotes.includes(userId)) {
            return await Review.findByIdAndUpdate(
                { _id: params.reviewId },
                { $pull: { downvotes: userId } },
                { new: true }
            );
        }
    });

    Promise.all([upvote, checkDownvote])
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  downvote({ params, userId }, res) {
    const downvote = Review.findOneAndUpdate(
        { _id: params.reviewId },
        { $push: { downvotes: userId } },
        { new: true },
    );

    const checkUpvote = Review.findOne({ _id: params.reviewId })
    .then(async review => {
        if(review.upvotes.includes(userId)) {
            return await Review.findByIdAndUpdate(
                { _id: params.reviewId },
                { $pull: { upvotes: userId } },
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
