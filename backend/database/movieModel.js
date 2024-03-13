const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  avgRating: {
    type: Number
  }
});

const MovieModel = mongoose.model('Movie', movieSchema);
module.exports = MovieModel;
