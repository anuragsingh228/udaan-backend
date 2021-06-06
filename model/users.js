const mongoose = require("mongoose");
var  Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  reviews: {
    type: [ObjectId],
    default:[]
  },
  followers: {
    type: [ObjectId],
    default:[]
  },
  following: {
    type: [ObjectId],
    default:[]
  },
  status: {
    type: String,
    default: ''
  },
  activity : {
    type: [String],
    default: []
  },
  posts:{
    type: [ObjectId],
    default:[]
  },
  interests:{
    type: [String],
    default: []
  },
  readbooks: {
    type: [ObjectId],
    default:[]
  },
  savedreviews : {
    type: [ObjectId],
    default:[]
  },
  isverified: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
