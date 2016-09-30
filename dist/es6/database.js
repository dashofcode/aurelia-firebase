import Promise from 'bluebird';
import Firebase from 'firebase';
import {Container} from 'aurelia-dependency-injection';
import {Configuration} from './configuration';

export class RetrieveData {

  _query = null;
  _valueMap = new Map();
  isLoading = true;
  items = [];

  constructor(path: Array<string>, listener: string, options: Object<any>) {
    if (!Container || !Container.instance) throw Error('Container has not been made global');
    let config = Container.instance.get(Configuration);
    if (!config) throw Error('Configuration has not been set');

    this._query = new Firebase.database().ref(RetrieveData._getChildLocation(path));
    
    if (options) this._query = RetrieveData._setQueryOptions(this._query, options);

    if (typeof listener === 'undefined' || listener === "on") this._listenToQuery(this._query);
    if (listener === "off") this._stopListeningToQuery(query);
    if (listener === "once") this._fetchQuery(this._query);
  }

  _fetchQuery(query) {
    query.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot, previousKey) => {
        this._onItemAdded(childSnapshot, previousKey);
      });
    });
  }

  _listenToQuery(query) {
    query.on('child_added', (snapshot, previousKey) => {
      this._onItemAdded(snapshot, previousKey);
    });
    query.on('child_removed', (snapshot) => {
      this._onItemRemoved(snapshot);
    });
    query.on('child_changed', (snapshot, previousKey) => {
      this._onItemChanged(snapshot, previousKey);
    });
    query.on('child_moved', (snapshot, previousKey) => {
      this._onItemMoved(snapshot, previousKey);
    });
  }

  _stopListeningToQuery(query) {
    query.off();
  }

  _onItemAdded(snapshot, previousKey) {
    let value = this._valueFromSnapshot(snapshot);
    let index = previousKey !== null ?
      this.items.indexOf(this._valueMap.get(previousKey)) + 1 : 0;
    this._valueMap.set(value.__firebaseKey__, value);
    this.items.splice(index, 0, value);
  }

  _onItemRemoved(oldSnapshot) {
    let key = oldSnapshot.key;
    let value = this._valueMap.get(key);

    if (!value) {
      return;
    }

    let index = this.items.indexOf(value);
    this._valueMap.delete(key);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  _onItemChanged(snapshot, previousKey) {
    let value = this._valueFromSnapshot(snapshot);
    let oldValue = this._valueMap.get(value.__firebaseKey__);

    if (!oldValue) {
      return;
    }

    this._valueMap.delete(oldValue.__firebaseKey__);
    this._valueMap.set(value.__firebaseKey__, value);
    this.items.splice(this.items.indexOf(oldValue), 1, value);
  }

  _onItemMoved(snapshot, previousKey) {
    let key = snapshot.key;
    let value = this._valueMap.get(key);

    if (!value) {
      return;
    }

    let previousValue = this._valueMap.get(previousKey);
    let newIndex = previousValue !== null ? this.items.indexOf(previousValue) + 1 : 0;
    this.items.splice(this.items.indexOf(value), 1);
    this.items.splice(newIndex, 0, value);
  }

  _valueFromSnapshot(snapshot) {
    let value = snapshot.val();
    if (!(value instanceof Object)) {
      value = {
        value: value,
        __firebasePrimitive__: true
      };
    }
    value.__firebaseKey__ = snapshot.key;
    this.isLoading = false;
    return value;
  }

  static _getChildLocation(path: Array<string>) {
    if (!path) {
      return '/';
    }

    return (Array.isArray(path) ? path.join('/') : path);
  }

  static _setQueryOptions(query, options: Object<any>) {
    for (var i = 0, keys = Object.keys(options); i < keys.length; i++) {
      var currentOption = keys[i];
      var currentValue = options[keys[i]];
      if (currentValue && currentOption !== 'listen') {
        query = query[currentOption]((currentValue !== true ? currentValue : ''));
      }
    }
    return query;
  }
}
