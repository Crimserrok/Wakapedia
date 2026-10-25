const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true, index: true }, // art_id
  by: { type: Schema.Types.ObjectId, ref: 'User', default: null },                        // com_by
  cont: { type: String, required: true },
  imgSrc: { type: String, default: null },                                                // img_src
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Comment', commentSchema);
