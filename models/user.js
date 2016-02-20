var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    google_id: {type: String },
    first_name: {type: String },
    last_name: {type: String },
    gender: {type: String },
    email: {type: String, required: true, unique: true },
    image: {type: String },
    access_token: {type: String },
    refresh_token: {type: String },
    language: {type: String },
    created: {type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};
