const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    private: { type: Boolean, default: false }, // Existing attribute
    favourite: {
        type: Schema.Types.ObjectId,
        ref: 'Book', // Reference to a Book model
        default: null, // Allows null if no favourite is selected
    },
    about: {
        type: String,
        maxlength: 500, // Limit to 500 characters
        default: '', // Default to an empty string if not provided
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
