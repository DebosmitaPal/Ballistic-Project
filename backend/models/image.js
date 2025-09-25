const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String, // GridFS filename
  originalName: String, // Original filename
  size: Number,
  type: String,
  uploadDate: { type: Date, default: Date.now },
  preview: String,
  contentHash: { type: String, required: true, unique: true }, // Added content hash field
  details: {
    caliber: String,
    weaponType: String,
    striationPattern: String,
    landAndGroove: String,
    twistDirection: String,
    confidence: String,
  },
});

module.exports = mongoose.model('Image', imageSchema);
