const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;

const JournalPageSchema = new mongoose.Schema({
  creator: {type: ObjectId, ref: "user"},
  name: String.apply, 
  pet: String, 
  timestamp: Date, 
});

// compile model from schema
module.exports = mongoose.model("journalpage", JournalPageSchema);
