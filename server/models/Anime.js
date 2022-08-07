const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const animeSchema = new Schema({
  creators: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  animeId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
},
{
  toJSON: {
    virtuals: true,
  },
  // prevents virtuals from creating duplicate of _id as `id`
  id: false,
});

// animeSchema.virtual('averageRating').get(function() {
//   let sum;
//   this.reviews.map(review => sum += review.rating);
//   return sum / this.reviews.length;
// });

module.exports = animeSchema;
