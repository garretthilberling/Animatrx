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
});

module.exports = animeSchema;
