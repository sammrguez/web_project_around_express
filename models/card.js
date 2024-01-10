const mongoose = require("mongoose");
const regExpLink = /^(https?\:\/\/)(www\.)?[\w~:/?%#[\]@!$&'\.()*+,;=]*\/#?/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  link: {
    validate: {
      validator: function (v) {
        return regExpLink.test(v);
      },
    },
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAd: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
