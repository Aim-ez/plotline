const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookStatusSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },

    status: {
        type: String,
        enum: ['Just Started', 'Halfway', 'Nearly Done'],
        required: true,
    },
});

const CurrentlyReadingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },

    books: [BookStatusSchema],
}, {
    timestamps: true,
});

const CurrentlyReading = mongoose.model('CurrentlyReading', CurrentlyReadingSchema);

module.exports = CurrentlyReading;