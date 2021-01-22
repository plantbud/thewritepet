const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Tag = new mongoose.Schema({
  creator: { type: ObjectId, ref: "user" },
  timeCreated: { type: Date, default: Date.now }, 
  content: { type: String, default: "" },
});

// compile model from schema
module.exports = mongoose.model("tag", Tag);