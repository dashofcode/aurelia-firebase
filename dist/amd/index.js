define(['exports', './configuration', './user', './authentication', './database', './events'], function (exports, _configuration, _user, _authentication, _database, _events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RetrieveData = exports.AuthenticationManager = exports.User = exports.Configuration = undefined;
  Object.defineProperty(exports, 'Configuration', {
    enumerable: true,
    get: function () {
      return _configuration.Configuration;
    }
  });
  Object.defineProperty(exports, 'User', {
    enumerable: true,
    get: function () {
      return _user.User;
    }
  });
  Object.defineProperty(exports, 'AuthenticationManager', {
    enumerable: true,
    get: function () {
      return _authentication.AuthenticationManager;
    }
  });
  Object.defineProperty(exports, 'RetrieveData', {
    enumerable: true,
    get: function () {
      return _database.RetrieveData;
    }
  });
  Object.keys(_events).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
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
});