var mongoose = require('mongoose');

// genre schema
var genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

// Get Genre
module.exports.getGenres = function(callback, limit) {
    Genre.find(callback).limit(limit);
};

// Add Genre
module.exports.addGenre = function(genre, callback) {
    Genre.create(genre, callback);
};

// find Genre by Id
module.exports.findGenreById = function(id, callback) {
    Genre.findById(id, callback);
};

// update genre
module.exports.updateGenre = function(id, genre, options, callback) {
    var query = { _id: id };
    var update = {
        name: genre.name
    };
    console.log('finding and updating..');
    Genre.findOneAndUpdate(query, update, options, callback);
    console.log('updated');
};

// delete genre
module.exports.deleteGenre = function(id, callback) {
    var condition = { _id: id };
    Genre.deleteOne(condition, callback);
}