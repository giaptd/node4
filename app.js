var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const bookRouter = require('./routes/bookRoute');

app.use(bodyParser.json());

app.use('/api/books/', bookRouter);
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));


Genre = require('./models/genre');
Book = require('./models/book');

const connectionString = 'mongodb://aaadmin:pass_word@ds056998.mlab.com:56998/giaptddemo';
// connect to database
mongoose.connect(connectionString);
var db = mongoose.connection;



app.get('/', function(req, res) {
    res.send('Hello from bookstore');

});

app.get('/api/genres', function(req, res) {
    Genre.getGenres(function(err, genres) {
        if (err)
            throw err;
        res.json(genres);
    });
});

app.post('/api/genres', function(req, res) {
    var genre = req.body;
    console.log(genre);
    Genre.addGenre(genre, function(err, genre) {
        if (err)
            throw err;
        res.json(genre);
    });
});

// find genre by id
app.get('/api/genres/:_id', function(req, res) {
    var _id = req.params._id;
    Genre.findById(_id, function(err, genre) {
        if (err)
            throw err;
        res.json(genre);
    });
});

// update genre
app.put('/api/genres/:_id', function(req, res) {
    var id = req.params._id;
    console.log(id);
    var genre = req.body;
    console.log(genre);
    Genre.updateGenre(id, genre, { upsert: true, new: true }, function(err, genre) {
        if (err)
            throw err;
        res.json(genre);
    });
});

app.delete('/api/genres/:_id', function(req, res) {
    var id = req.params._id;
    Genre.deleteGenre(id, function(err, genre) {
        if (err)
            throw err;
        res.json(genre);
    });
});


app.listen(4000);
console.log('running on port 4000');