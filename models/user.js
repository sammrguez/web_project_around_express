const mongoose = require("mongoose");
const regExpLink = /^(https?\:\/\/)(www\.)?[\w~:/?%#[\]@!$&'\.()*+,;=]*\/#?/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return regExpLink.test(v);
      },
    },
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
