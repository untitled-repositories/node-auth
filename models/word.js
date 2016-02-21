var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
    word: {type: String, required: true, unique: true },
    length: {type: Number, required: true },
    added: {type: Date, default: Date.now },
    guess_count: {type: Number, default: 0 },
    mistakes_count: {type: Number, default: 0 },
    mistakes: [{
        index: {type: Number},
        string: {type: String},
    }],
    complexity: {type: Number, default: 0 } // mistakes_count divided by guess_count
});

var Word = mongoose.model('Word', wordSchema);

module.exports = {
    Word: Word
};
