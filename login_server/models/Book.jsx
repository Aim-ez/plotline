const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    isbn: {
        type: String,
        trim: true,
        index: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    author: {
        type: String,
        required: true,
        trim: true,
    },

    published: {
        type: Date,
    },

    description: {
        type: String,
        trim: true,
        default: '',
    },

    coverLink: {
        type: String,
        trim: true,
        default: '',
    },

    genre: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;