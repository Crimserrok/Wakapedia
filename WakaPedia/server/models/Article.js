const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 255 },
  slug: { type: String, required: true, unique: true },
  cont: { type: String, required: true },
  writeBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  posX: { type: Number, required: true }, // longitude
  posY: { type: Number, required: true }  // latitude
}, { timestamps: true });

articleSchema.index({ title: 'text', cont: 'text' });

module.exports = model('Article', articleSchema);
