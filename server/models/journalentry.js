const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Journalentry = new mongoose.Schema({
  creator: { type: ObjectId, ref: "user" },
  entries: { type: String, default: "" },
  timeCreated: Date , 
  tags: { type: ObjectId, ref: "tag" },
});

// compile model from schema
module.exports = mongoose.model("journalentry", Journalentry);