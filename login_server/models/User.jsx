const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    private: {
        type: Boolean,
        default: false,
    },

    favourite: {
        type: Schema.Types.ObjectId,
        ref: 'Book', //reference to Book db object
        default: null,
    },

    about: {
        type: String,
        maxlength: 500,
        default: '', //default to empty string if not provided
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;