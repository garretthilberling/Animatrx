const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  reviewId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
