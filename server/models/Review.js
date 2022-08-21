const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  animeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
},
{
  toJSON: {
    virtuals: true,
  },
  // prevents virtuals from creating duplicate of _id as `id`
  id: false,
}
);

ReviewSchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

const Review = model("Review", ReviewSchema);

module.exports = Review;
