const sms = require('../helpers/sms');

/**
 * Controller for sticky endpoints.
 */

'use strict';

// import sticky service.
const userService = require('../services/user-service');
/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function(request, response) {
  const callback = function(users) {
    response.status(200);
    response.json(users);
    // console.log(users);
  };

  userService.search(request.query, callback);
};
/**
 *
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 */
exports.sendSMS = (req, res) => {
  const code = req.body.Code;
  sms.sendSMS('Your verification code is '+code, '+94778691968');
  res.status(200);
};
/**
 * Creates a new sticky with the request JSON and
 * returns sticky JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function(request, response) {
  console.log('In body');
  console.log(request.body);
  const newUser = Object.assign({}, request.body);
  const callback = function(user) {
    response.status(200);
    response.json(user);
  };
  userService.save(newUser, callback);
};

/**
 * Updates and returns a sticky object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function(request, response) {
  const user = Object.assign({}, request.body);
  const callback = function(user) {
    response.status(200);
    response.json(user);
  };
  user._id = request.params.userId;
  console.log(user);
  userService.update(user, callback);
};


exports.find = function(request, response) {
  const callback = function(user) {
    response.status(200);
    response.json(user);
  };
  const id = request.params.userId;
  userService.findById(id, callback);
};

/**
 * Returns a sticky object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.findByEmail = function(request, response) {
  const callback = function(user) {
    response.status(200);
    response.json(user);
  };
  userService.findByEmail(request.params.emailId, callback);
};
