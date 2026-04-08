const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Favourite', FavouriteSchema);