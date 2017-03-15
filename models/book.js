var mongoose = require('mongoose');

// genre schema
var bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: String,
    genre: String
});

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback, limit) {
    Book.find(callback).limit(limit);
};

// Add Book
module.exports.addBook = function(book, callback) {
    Book.create(book, callback);
};

// find book by Id
module.exports.findBookById = function(id, callback) {
    Book.findById(id, callback);
};

// find all book by name
module.exports.findBookByGenre = function(genreName, callback) {
    var query = { genre: genreName };
    Book.find(query, callback);
};