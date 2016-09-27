'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Publisher = exports.UserAuthStateChangedEvent = exports.UserDeletedEvent = exports.UserPasswordChangedEvent = exports.UserEmailChangedEvent = exports.UserSignedOutEvent = exports.UserSignedInEvent = exports.UserCreatedEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class10;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FirebaseEvent = function FirebaseEvent() {
  _classCallCheck(this, FirebaseEvent);

  this.handled = false;
};

var UserEvent = function (_FirebaseEvent) {
  _inherits(UserEvent, _FirebaseEvent);

  function UserEvent() {
    var uid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    _classCallCheck(this, UserEvent);

    var _this = _possibleConstructorReturn(this, (UserEvent.__proto__ || Object.getPrototypeOf(UserEvent)).call(this));

    _this.uid = uid;
    return _this;
  }

  return UserEvent;
}(FirebaseEvent);

var UserCreatedEvent = exports.UserCreatedEvent = function (_UserEvent) {
  _inherits(UserCreatedEvent, _UserEvent);

  function UserCreatedEvent(data) {
    _classCallCheck(this, UserCreatedEvent);

    var _this2 = _possibleConstructorReturn(this, (UserCreatedEvent.__proto__ || Object.getPrototypeOf(UserCreatedEvent)).call(this, data.uid));

    _this2.email = data.email;
    return _this2;
  }

  return UserCreatedEvent;
}(UserEvent);

var UserSignedInEvent = exports.UserSignedInEvent = function (_UserEvent2) {
  _inherits(UserSignedInEvent, _UserEvent2);

  function UserSignedInEvent(data) {
    _classCallCheck(this, UserSignedInEvent);

    var _this3 = _possibleConstructorReturn(this, (UserSignedInEvent.__proto__ || Object.getPrototypeOf(UserSignedInEvent)).call(this, data.uid));

    _this3.provider = data.provider;
    _this3.email = data.email;
    return _this3;
  }

  return UserSignedInEvent;
}(UserEvent);

var UserSignedOutEvent = exports.UserSignedOutEvent = function (_UserEvent3) {
  _inherits(UserSignedOutEvent, _UserEvent3);

  function UserSignedOutEvent(data) {
    _classCallCheck(this, UserSignedOutEvent);

    var _this4 = _possibleConstructorReturn(this, (UserSignedOutEvent.__proto__ || Object.getPrototypeOf(UserSignedOutEvent)).call(this));

    _this4.email = data.email;
    return _this4;
  }

  return UserSignedOutEvent;
}(UserEvent);

var UserEmailChangedEvent = exports.UserEmailChangedEvent = function (_UserEvent4) {
  _inherits(UserEmailChangedEvent, _UserEvent4);

  function UserEmailChangedEvent(data) {
    _classCallCheck(this, UserEmailChangedEvent);

    var _this5 = _possibleConstructorReturn(this, (UserEmailChangedEvent.__proto__ || Object.getPrototypeOf(UserEmailChangedEvent)).call(this));

    _this5.oldEmail = data.oldEmail;
    _this5.newEmail = data.newEmail;
    return _this5;
  }

  return UserEmailChangedEvent;
}(UserEvent);

var UserPasswordChangedEvent = exports.UserPasswordChangedEvent = function (_UserEvent5) {
  _inherits(UserPasswordChangedEvent, _UserEvent5);

  function UserPasswordChangedEvent(data) {
    _classCallCheck(this, UserPasswordChangedEvent);

    var _this6 = _possibleConstructorReturn(this, (UserPasswordChangedEvent.__proto__ || Object.getPrototypeOf(UserPasswordChangedEvent)).call(this));

    _this6.email = data.email;
    return _this6;
  }

  return UserPasswordChangedEvent;
}(UserEvent);

var UserDeletedEvent = exports.UserDeletedEvent = function (_UserEvent6) {
  _inherits(UserDeletedEvent, _UserEvent6);

  function UserDeletedEvent(data) {
    _classCallCheck(this, UserDeletedEvent);

    var _this7 = _possibleConstructorReturn(this, (UserDeletedEvent.__proto__ || Object.getPrototypeOf(UserDeletedEvent)).call(this));

    _this7.email = data.email;
    return _this7;
  }

  return UserDeletedEvent;
}(UserEvent);

var UserAuthStateChangedEvent = exports.UserAuthStateChangedEvent = function (_UserEvent7) {
  _inherits(UserAuthStateChangedEvent, _UserEvent7);

  function UserAuthStateChangedEvent(data) {
    _classCallCheck(this, UserAuthStateChangedEvent);

    data = data || {};

    var _this8 = _possibleConstructorReturn(this, (UserAuthStateChangedEvent.__proto__ || Object.getPrototypeOf(UserAuthStateChangedEvent)).call(this, data.uid));

    _this8.provider = data.provider || null;
    _this8.auth = data.auth || null;
    _this8.expires = data.expires || 0;
    return _this8;
  }

  return UserAuthStateChangedEvent;
}(UserEvent);

var Publisher = exports.Publisher = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class10 = function () {
  function Publisher(eventAggregator) {
    _classCallCheck(this, Publisher);

    this._eventAggregator = eventAggregator;
  }

  _createClass(Publisher, [{
    key: 'publish',
    value: function publish(event) {
      if (event.handled) {
        return;
      }
      this._eventAggregator.publish(event);
    }
  }]);

  return Publisher;
}()) || _class10);