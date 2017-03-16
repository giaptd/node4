var mongoose = require('mongoose');

// genre schema
var customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: String,
    orderedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    prefergenres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]
});

var Customer = module.exports = mongoose.model('Customer', customerSchema);

module.exports.getCustomers = function(callback, limit) {
    Customer.find(callback).limit(limit);
};

// Add Book
module.exports.addCustomer = function(customer, callback) {
    Customer.create(customer, callback);
};