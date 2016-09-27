'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var inject, EventAggregator, _createClass, _dec, _class10, FirebaseEvent, UserEvent, UserCreatedEvent, UserSignedInEvent, UserSignedOutEvent, UserEmailChangedEvent, UserPasswordChangedEvent, UserDeletedEvent, UserAuthStateChangedEvent, Publisher;

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      FirebaseEvent = function FirebaseEvent() {
        _classCallCheck(this, FirebaseEvent);

        this.handled = false;
      };

      UserEvent = function (_FirebaseEvent) {
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

      _export('UserCreatedEvent', UserCreatedEvent = function (_UserEvent) {
        _inherits(UserCreatedEvent, _UserEvent);

        function UserCreatedEvent(data) {
          _classCallCheck(this, UserCreatedEvent);

          var _this2 = _possibleConstructorReturn(this, (UserCreatedEvent.__proto__ || Object.getPrototypeOf(UserCreatedEvent)).call(this, data.uid));

          _this2.email = data.email;
          return _this2;
        }

        return UserCreatedEvent;
      }(UserEvent));

      _export('UserCreatedEvent', UserCreatedEvent);

      _export('UserSignedInEvent', UserSignedInEvent = function (_UserEvent2) {
        _inherits(UserSignedInEvent, _UserEvent2);

        function UserSignedInEvent(data) {
          _classCallCheck(this, UserSignedInEvent);

          var _this3 = _possibleConstructorReturn(this, (UserSignedInEvent.__proto__ || Object.getPrototypeOf(UserSignedInEvent)).call(this, data.uid));

          _this3.provider = data.provider;
          _this3.email = data.email;
          return _this3;
        }

        return UserSignedInEvent;
      }(UserEvent));

      _export('UserSignedInEvent', UserSignedInEvent);

      _export('UserSignedOutEvent', UserSignedOutEvent = function (_UserEvent3) {
        _inherits(UserSignedOutEvent, _UserEvent3);

        function UserSignedOutEvent(data) {
          _classCallCheck(this, UserSignedOutEvent);

          var _this4 = _possibleConstructorReturn(this, (UserSignedOutEvent.__proto__ || Object.getPrototypeOf(UserSignedOutEvent)).call(this));

          _this4.email = data.email;
          return _this4;
        }

        return UserSignedOutEvent;
      }(UserEvent));

      _export('UserSignedOutEvent', UserSignedOutEvent);

      _export('UserEmailChangedEvent', UserEmailChangedEvent = function (_UserEvent4) {
        _inherits(UserEmailChangedEvent, _UserEvent4);

        function UserEmailChangedEvent(data) {
          _classCallCheck(this, UserEmailChangedEvent);

          var _this5 = _possibleConstructorReturn(this, (UserEmailChangedEvent.__proto__ || Object.getPrototypeOf(UserEmailChangedEvent)).call(this));

          _this5.oldEmail = data.oldEmail;
          _this5.newEmail = data.newEmail;
          return _this5;
        }

        return UserEmailChangedEvent;
      }(UserEvent));

      _export('UserEmailChangedEvent', UserEmailChangedEvent);

      _export('UserPasswordChangedEvent', UserPasswordChangedEvent = function (_UserEvent5) {
        _inherits(UserPasswordChangedEvent, _UserEvent5);

        function UserPasswordChangedEvent(data) {
          _classCallCheck(this, UserPasswordChangedEvent);

          var _this6 = _possibleConstructorReturn(this, (UserPasswordChangedEvent.__proto__ || Object.getPrototypeOf(UserPasswordChangedEvent)).call(this));

          _this6.email = data.email;
          return _this6;
        }

        return UserPasswordChangedEvent;
      }(UserEvent));

      _export('UserPasswordChangedEvent', UserPasswordChangedEvent);

      _export('UserDeletedEvent', UserDeletedEvent = function (_UserEvent6) {
        _inherits(UserDeletedEvent, _UserEvent6);

        function UserDeletedEvent(data) {
          _classCallCheck(this, UserDeletedEvent);

          var _this7 = _possibleConstructorReturn(this, (UserDeletedEvent.__proto__ || Object.getPrototypeOf(UserDeletedEvent)).call(this));

          _this7.email = data.email;
          return _this7;
        }

        return UserDeletedEvent;
      }(UserEvent));

      _export('UserDeletedEvent', UserDeletedEvent);

      _export('UserAuthStateChangedEvent', UserAuthStateChangedEvent = function (_UserEvent7) {
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
      }(UserEvent));

      _export('UserAuthStateChangedEvent', UserAuthStateChangedEvent);

      _export('Publisher', Publisher = (_dec = inject(EventAggregator), _dec(_class10 = function () {
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
      }()) || _class10));

      _export('Publisher', Publisher);
    }
  };
});