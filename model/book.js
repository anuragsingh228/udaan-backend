const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// Create Schema
const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = Book = mongoose.model("books", BookSchema);
