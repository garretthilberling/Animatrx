const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    profilePicture: {
      type: String,
      data: Buffer,
      required: false
    },
    watchLater: [{ type: String }],
    favorites: [{ type: String }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// set up pre-save middleware to create password
UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;