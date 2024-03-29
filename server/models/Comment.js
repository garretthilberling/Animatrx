const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    responseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

CommentSchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
