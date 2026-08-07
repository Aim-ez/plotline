const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    isbn: String,
    title: String,
    author: String, 
    published: Date,
    description: String,
    coverLink: String,
    genre: { type: String, required: false },
})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;