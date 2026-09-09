const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReadingListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
});

const ReadingList = mongoose.model('ReadingList', ReadingListSchema);

module.exports = ReadingList;