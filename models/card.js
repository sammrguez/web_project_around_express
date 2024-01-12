const mongoose = require("mongoose");

const regExpLink = /^(https?\:\/\/)(www\.)?[\w~:/?%#[\]@!$&'\.()*+,;=]*\/#?/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        return regExpLink.test(v);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAd: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
