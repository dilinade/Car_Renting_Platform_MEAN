/**
 * Controller for booking endpoints.
 */

'use strict';
// import booking service.
const bookingService = require('../services/booking-service');

const stripe = require('stripe')('sk_test_dVvqzbDsn69niZkiBA8su9vg');
/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function(request, response) {
  const callback = function(bookings) {
    response.status(200);
    response.json(bookings);
  };
  bookingService.search(request.query, callback);
};

/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.pay = function(request, response) {
  stripe.customers
      .create({
        email: request.body.email,
      })
      .then((customer) => {
        return stripe.customers.createSource(customer.id, {
          source: 'tok_visa',
        });
      })
      .then((source) => {
        return stripe.charges.create({
          amount: request.body.bookingprice,
          currency: 'lkr',
          customer: source.customer,
        });
      })
      .then((charge) => {
        response.status(200);
        response.json(charge);
        // New charge created on a new customer
      })
      .catch((err) => {
        // Deal with an error
      });
};
/**
 * Creates a new booking with the request JSON and
 * returns booking JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function(request, response) {
  const newBooking = Object.assign({}, request.body);
  const callback = function(booking) {
    response.status(200);
    response.json(booking);
  };
  bookingService.save(newBooking, callback);
};

exports.find = function(request, response) {
  const callback = function(booking) {
    response.status(200);
    response.json(booking);
  };
  const id = request.params.bookingId;
  bookingService.findById(id, callback);
};

exports.update = function(request, response) {
  console.log(request.body);
  const booking = Object.assign({}, request.body);
  const callback = function(booking) {
    response.status(200);
    response.json(booking);
  };
  booking._id = request.params.bookingId;
  console.log(booking);
  bookingService.update(booking, callback);
};
