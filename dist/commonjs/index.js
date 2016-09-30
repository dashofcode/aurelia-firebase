'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RetrieveData = exports.AuthenticationManager = exports.User = exports.Configuration = undefined;

var _configuration = require('./configuration');

Object.defineProperty(exports, 'Configuration', {
  enumerable: true,
  get: function get() {
    return _configuration.Configuration;
  }
});

var _user = require('./user');

Object.defineProperty(exports, 'User', {
  enumerable: true,
  get: function get() {
    return _user.User;
  }
});

var _authentication = require('./authentication');

Object.defineProperty(exports, 'AuthenticationManager', {
  enumerable: true,
  get: function get() {
    return _authentication.AuthenticationManager;
  }
});

var _database = require('./database');

Object.defineProperty(exports, 'RetrieveData', {
  enumerable: true,
  get: function get() {
    return _database.RetrieveData;
  }
});

var _events = require('./events');

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});
exports.configure = configure;
function configure(aurelia, configCallback) {
  var config = new _configuration.Configuration(_configuration.Configuration.defaults);

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(config);
  }
  aurelia.instance(_configuration.Configuration, config);
}