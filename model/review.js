const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// Create Schema
const ReviewSchema = new Schema({
  createdBy: {
    type: [ObjectId],
    required: true,
  },
  bookName: {
    type: ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  activity:{
    type: [String],
    default:[],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [ObjectId],
    default: [],
  },
  isPublished: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

module.exports = Review = mongoose.model("reviews", ReviewSchema);
