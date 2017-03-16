const express = require('express');
const bookRoute = express.Router();

bookRoute.route('/books')
    .get(function(req, res) {
        Book.getBooks(function(err, books) {
            if (err)
                throw err;
            res.json(books);
        });
    })
    .post(function(req, res) {
        var book = req.body;
        console.log('creating book with book detail:');
        console.log(book);
        Book.addBook(book, function(err, genre) {
            if (err)
                throw err;
            res.json(book);
        });
    });
bookRoute.route('/books/:_id')
    .get(function(req, res) {
        var _id = req.params._id;
        console.log('get book detail with id:' + _id);
        Book.findById(_id, function(err, book) {
            if (err)
                throw err;
            res.json(book);
        });
    });
bookRoute.route('/books/listbygenres/:genres')
    .get(function(req, res) {
        var genres = req.params.genres.split(',');
        console.log(genres);
        Book.findBookByGenre(genres, function(err, books) {
            if (err)
                throw err;
            var titles = [];
            books.forEach(function(item) {
                titles.push(item.title);
            });
            var result = {
                count: books.length,
                titles: titles
            };
            res.json(result);
        });
    });
bookRoute.route('/search')
    .post(function(req, res) {
        var searchKeys = req.body;
        res.json(searchKeys);
    })
    .get(function(req, res) {
        res.json('should not see this');
    });

module.exports = bookRoute;