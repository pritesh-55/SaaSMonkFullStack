const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
    trim: true
  },
});

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
