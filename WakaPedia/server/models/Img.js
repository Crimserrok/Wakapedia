const { Schema, model } = require('mongoose');

const imgSchema = new Schema({
  src: { type: String, required: true },                                  
  by: { type: Schema.Types.ObjectId, ref: 'User', default: null },       
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true, index: true }, 
  order: { type: Number, default: 0 },                                  
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Img', imgSchema);
