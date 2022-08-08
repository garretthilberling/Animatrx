const { Comment, Review, User } = require("../models");
var mongoose = require("mongoose");

const reviewController = {
  // get a single comment
  getComment({ params }, res) {
    Comment.findOne({ _id: params.commentId })
      .populate({
        path: "upvotes",
        select: "-__v",
      })
      .populate({
        path: "downvotes",
        select: "-__v",
      })
      .populate({
        path: "replies",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((comment) => res.json(comment))
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  },
  // get all comments for a review
  getComments({ params }, res) {
    Comment.find({ responseId: params.reviewId })
      .populate({
        path: "upvotes",
        select: "-__v",
      })
      .populate({
        path: "downvotes",
        select: "-__v",
      })
      .populate({
        path: "replies",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((comment) => res.json(comment))
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  },

  addComment({ params, body, headers }, res) {
    if(headers.authorization) {
      Comment.create({
        responseId: params.reviewId,
        userId: body.userId,
        body: body.body,
      })
        .then((comment) => res.json(comment))
        .catch((err) => res.json(err));
    } else {
      throw new Error('must be logged in!')
    }
  },

  updateComment({ params, body, headers }, res) {
    if(headers.authorization) {
      Comment.findOneAndUpdate({ _id: params.commentId }, body, { new: true })
        .then((comment) => res.json(comment))
        .catch((err) => res.json(err));
    } else {
      throw new Error('must be logged in!')
    }
  },

  removeComment({ params, headers }, res) {
    if(headers.authorization) {
      const rmComment = Comment.findOneAndDelete({ _id: params.commentId });
      const updateReview = Review.findOneAndUpdate(
        { _id: params.reviewId },
        { $pull: { comments: params.commentId } },
        { new: true }
      );
  
      Promise.all([rmComment, updateReview])
        .then((updatedData) => {
          if (!updatedData) {
            res.status(404).json({ message: "Invalid comment or review _id." });
          }
          res.json(updatedData);
        })
        .catch((err) => res.json(err));
    } else {
      throw new Error('must be logged in!')
    }
  },

  upvote({ params, body, headers }, res) {
    if(headers.authorization) {
      let id = mongoose.Types.ObjectId(body.userId);
  
      const upvote = Comment.findOne({ _id: params.commentId }).then(
        async (comment) => {
          if (!comment.upvotes.includes(id)) {
            return await Comment.findByIdAndUpdate(
              { _id: params.commentId },
              { $push: { upvotes: body.userId } },
              { new: true }
            );
          }
        }
      );
  
      const checkDownvote = Comment.findOne({ _id: params.commentId }).then(
        async (comment) => {
          if (comment.downvotes.includes(id)) {
            return await Comment.findByIdAndUpdate(
              { _id: params.commentId },
              { $pull: { downvotes: body.userId } },
              { new: true }
            );
          }
        }
      );
  
      Promise.all([upvote, checkDownvote])
        .then((comment) => res.json(comment))
        .catch((err) => res.json(err));
    } else {
      throw new Error('must be logged in!')
    }
  },

  downvote({ params, body, headers }, res) {
    if(headers.authorization) {
      let id = mongoose.Types.ObjectId(body.userId);
  
      const downvote = Comment.findOne({ _id: params.commentId }).then(
        async (comment) => {
          if (!comment.downvotes.includes(id)) {
            return await Comment.findByIdAndUpdate(
              { _id: params.commentId },
              { $push: { downvotes: body.userId } },
              { new: true }
            );
          }
        }
      );
  
      const checkUpvote = Comment.findOne({ _id: params.commentId }).then(
        async (comment) => {
          if (comment.upvotes.includes(id)) {
            return await Comment.findByIdAndUpdate(
              { _id: params.commentId },
              { $pull: { upvotes: body.userId } },
              { new: true }
            );
          }
        }
      );
  
      Promise.all([downvote, checkUpvote])
        .then((comment) => res.json(comment))
        .catch((err) => res.json(err));
    } else {
      throw new Error('must be logged in!')
    }
  },

  addReply({ params, body, headers }, res) {
    if(headers.authorization) {
      // create comment
      Comment.create({
        body: body.body,
        userId: body.userId,
        responseId: params.commentId,
      })
        .then(async (comment) => {
          // update comment we are replying to
          return await Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: comment._id } },
            { new: true }
          )
            .then((comment) => res.json(comment))
            .catch((err) => res.json(err));
        });
    } else {
      throw new Error('must be logged in!')
    }
  },

  removeReply({ params, body, headers }, res) {
    if(headers.authorization) {
      const rmReply = Comment.findOneAndDelete({ _id: body.replyId });
      const updateComment = Comment.findOneAndUpdate(
        { _id: params.commentId },
        { $pull: { comments: body.replyId } },
        { new: true }
      );
  
      Promise.all([rmReply, updateComment])
        .then((updatedData) => {
          if (!updatedData) {
            res.status(404).json({ message: "Invalid reply or comment _id." });
          }
          res.json(updatedData);
        })
        .catch((err) => res.json(err));
    } else {
      throw new Error('must be logged in!')
    }
  },
};

module.exports = reviewController;
