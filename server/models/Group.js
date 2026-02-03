const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [
    {
      name: { type: String, required: true },
      avatarColor: { type: String, default: '#007bff' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);