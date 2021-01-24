const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  consistency: {type: Number, default: 0},
  petType: { type: String, default: "doggo" },
  petMood: {type: Number, default: 1}, 
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
