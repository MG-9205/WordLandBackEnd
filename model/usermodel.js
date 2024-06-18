const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Username: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Library: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
