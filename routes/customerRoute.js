const express = require('express');
const customerRoute = express.Router();

customerRoute.route('/customers')
    .get(function(req, res) {
        Customer.getCustomers(function(err, customers) {
            if (err)
                throw err;
            res.json(customers);
        });
    })
    .post(function(req, res) {
        var customer = req.body;
        console.log('creating customer with detail:');
        console.log(customer);
        Customer.addCustomer(customer, function(err, customer) {
            if (err)
                throw err;
            res.json(customer);
        });
    });

// find all customer with prefered list of genres and a list of ordered books

customerRoute.route('/findcustomer')
    .post(function(req, res) {
        var preferedGenres = req.body.preferedGenres;
        var orderedBooks = req.body.orderedBooks;
        // init 2 Lists to save temporary data
        var rawList = [];
        Customer.find({}, function(err, custs) {
            if (err)
                throw err;
            custs.forEach(function(cust) {
                var tempItem = {
                    id: cust._id,
                    preferedGenres: cust.prefergenres,
                    orderedBooks: cust.orderedBooks
                };
                rawList.push(tempItem);
            });
            console.log('step1: get all db documents');
            console.log(rawList);
            var processedList = [];
            // round 1: find all customer match preferedGenres condition
            preferedGenres.forEach(function(genre) {
                processedList = rawList.filter(function(rawItem) {
                    return rawItem.preferedGenres.indexOf(genre) > -1;
                });
                rawList = processedList;
            });
            console.log('step 2: filter by genres');
            console.log(rawList);
            orderedBooks.forEach(function(book) {
                console.log(rawList);
                processedList = rawList.filter(function(rawItem) {
                    return rawItem.orderedBooks.indexOf(book) > -1;
                });
                rawList = processedList;
                console.log(rawList);
            });
            console.log('step3: filter by ordered books');
            console.log(rawList);
            res.json(rawList);
            // round 2: find all orderedBooks

        });

    });

function filterGenre(rawItem, genre) {
    return rawItem.preferedGenres.contains(genre);
}

function filterBook(rawItem, book) {
    return rawItem.orderedBooks.contains(book)
}
module.exports = customerRoute;