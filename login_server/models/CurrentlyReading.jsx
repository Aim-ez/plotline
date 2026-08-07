const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookStatusSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book', // Reference the Book model
        required: true,
    },
    status: {
        type: String,
        enum: ['Just Started', 'Halfway', 'Nearly Done'], // Restrict to valid statuses
        required: true,
    },
});

const CurrentlyReadingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true,
    },
    books: [BookStatusSchema], // Embed book and status as a subdocument
});

const CurrentlyReading = mongoose.model('CurrentlyReading', CurrentlyReadingSchema);

module.exports = CurrentlyReading;
