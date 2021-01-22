const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const DaySchema = new mongoose.Schema({
  creator: { type: ObjectId, ref: "user" },
  day: Number,
  month: Number,
  year: Number,
  entries: { type: String, default: "" },
});

// compile model from schema
module.exports = mongoose.model("day", DaySchema);