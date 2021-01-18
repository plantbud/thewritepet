const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const JournalEntrySchema = new mongoose.Schema({
  creator: { type: ObjectId, ref: "user" },
  content: { type: String, default: "" },
  tags: {type: ObjectId, ref: "tag"},
});

// compile model from schema
module.exports = mongoose.model("journalentry", JournalEntrySchema);