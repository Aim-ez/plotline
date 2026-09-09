const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:  true,
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required:  true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;