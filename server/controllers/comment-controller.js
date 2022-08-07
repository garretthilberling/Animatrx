const { Comment, Review, User } = require("../models");

const reviewController = {
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

  getComments({ params }, res) {
    Comment.find({ animeId: params.animeId })
    .then(comment => res.json(comment))
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
    .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  },

  addComment({ params, body, userId }, res) {
    Review.create(params.animeId, body, userId)
    .then(comment => res.json(comment))
    .catch(err => res.json(err));
  },

  updateComment({params, body}, res) {
    Review.findOneAndUpdate({ _id: params.commentId }, body)
    .then(comment => res.json(comment))
    .catch(err => res.json(err));
  },

  removeComment({params, commentId}, res) {
    const rmComment = Comment.findOneAndDelete({ _id: commentId});
    const updateReview = Review.findOneAndUpdate(
        { _id: params.reviewId},
        { $pull: { comments: commentId } },
        { new: true }
    );

    Promise.all([rmComment, updateReview])
    .then(updatedData => {
        if(!updatedData) {
            res.status(404).json({ message: "Invalid comment or review _id." })
        }
        res.json(updatedData);
    })
    .catch(err => res.json(err));
  },

  upvote({ commentId, userId }, res) {
    const upvote = Comment.findOneAndUpdate(
        { _id: commentId },
        { $push: { upvotes: userId } },
        { new: true },
    );

    const checkDownvote = Comment.findOne({ _id: commentId })
    .then(async comment => {
        if(comment.downvotes.includes(userId)) {
            return await Comment.findByIdAndUpdate(
                { _id: commentId },
                { $pull: { downvotes: userId } },
                { new: true }
            );
        }
    });

    Promise.all([upvote, checkDownvote])
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  downvote({ commentId, userId }, res) {
    const downvote = Comment.findOneAndUpdate(
        { _id: commentId },
        { $push: { downvotes: userId } },
        { new: true },
    );

    const checkUpvote = Comment.findOne({ _id: commentId })
    .then(async review => {
        if(review.upvotes.includes(userId)) {
            return await Comment.findByIdAndUpdate(
                { _id: commentId },
                { $pull: { upvotes: userId } },
                { new: true }
            );
        }
    });

    Promise.all([downvote, checkUpvote])
    .then(review => res.json(review))
    .catch(err => res.json(err));
  },

  addReply({ commentId, body, userId }, res) {
    // create comment
    Comment.Create({ body: body, userId: userId})
    .then(async comment => {
        // update comment we are replying to
        const updatecomment = await Comment.findOneAndUpdate(
            {_id: commentId},
            { $push: { replies: comment._id } },
            { new: true }
        );
        // update user
        const updateUser = await User.findOneAndUpdate(
            { _id: userId }, 
            { $push: { comments: comment._id }}
        );
        return Promise.all([updatecomment, updateUser])
        .then(comment => res.json(comment))
        .catch(err => res.json(err));
    })
    .then(comment => res.json(comment))
    .catch(err => res.json(err));
  },

  removeReply({commentId, replyId, userId}, res) {
    const rmReply = Comment.findOneAndDelete({ _id: replyId});
    const updateComment = Comment.findOneAndUpdate(
        { _id: commentId },
        { $pull: { comments: replyId } },
        { new: true }
    );
    const updateUser = User.findOneAndUpdate(
        { _id: userId },
        { $pull: {comments: replyId } },
        { new: true }
    );

    Promise.all([rmReply, updateComment, updateUser])
    .then(updatedData => {
        if(!updatedData) {
            res.status(404).json({ message: "Invalid comment or review _id." })
        }
        res.json(updatedData);
    })
    .catch(err => res.json(err));
  },

};

module.exports = reviewController;
