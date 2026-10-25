const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  mail: { type: String, required: true, unique: true, trim: true, maxlength: 50 },
  key: { type: String, required: true },                                           // user_key (เข้ารหัส bcrypt hash)
  name: { type: String, required: true, trim: true, maxlength: 50 },              
  type: { type: Number, enum: [0, 1], default: 0 }                                 // user_type: 1 = admin
});

module.exports = model('User', userSchema);
