'use strict';

System.register(['./configuration', './user', './authentication', './collection', './events'], function (_export, _context) {
  "use strict";

  var Configuration;
  function configure(aurelia, configCallback) {
    var config = new Configuration(Configuration.defaults);

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }
    aurelia.instance(Configuration, config);
  }

  _export('configure', configure);

  return {
    setters: [function (_configuration) {
      Configuration = _configuration.Configuration;
      var _exportObj = {};
      _exportObj.Configuration = _configuration.Configuration;

      _export(_exportObj);
    }, function (_user) {
      var _exportObj2 = {};
      _exportObj2.User = _user.User;

      _export(_exportObj2);
    }, function (_authentication) {
      var _exportObj3 = {};
      _exportObj3.AuthenticationManager = _authentication.AuthenticationManager;

      _export(_exportObj3);
    }, function (_collection) {
      var _exportObj4 = {};
      _exportObj4.ReactiveCollection = _collection.ReactiveCollection;

      _export(_exportObj4);
    }, function (_events) {
      var _exportObj5 = {};

      for (var _key in _events) {
        if (_key !== "default" && _key !== "__esModule") _exportObj5[_key] = _events[_key];
      }

      _export(_exportObj5);
    }],
    execute: function () {}
  };
});