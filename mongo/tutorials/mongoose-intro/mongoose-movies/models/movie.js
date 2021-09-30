const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const movieSchema = new Schema({});

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    releaseYear: {
      type: Number,
      default: function () {
        return new Date().getFullYear();
      },
    },
    mpaaRating: { type: String, enum: ["G", "PG", "PG-13", "R"] },
    cast: [String],
    nowShowing: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
