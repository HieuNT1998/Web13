const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, require: true }
}, {
  timestamps: true,
  _id: false
});

const ImageSchema = new Schema({
  imageUrl: { type: String, required: true },
  view: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  comments: [CommentSchema],
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
},{
  timestamps: true
});

module.exports = mongoose.model("Image", ImageSchema);