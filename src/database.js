import Promise from 'bluebird';
import Firebase from 'firebase';
import {Container} from 'aurelia-dependency-injection';
import {Configuration} from './configuration';

export class RetrieveData {

  _query = null;
  _valueMap = new Map();
  isLoading = true;
  items = [];

  constructor(path: Array<string>, options: Object<any>) {
    if (!Container || !Container.instance) throw Error('Container has not been made global');
    let config = Container.instance.get(Configuration);
    if (!config) throw Error('Configuration has not been set');

    this._query = new Firebase.database().ref(RetrieveData._getChildLocation(path));
    
    if (options) {
      this._query = RetrieveData._setQueryOptions(this._query, options);
      if (typeof options.listener === 'undefined' || options.listener === true) {
        this._listenToQuery(this._query);
      } else {
        this._fetchQuery(this._query);
      }
    } else {
      this._listenToQuery(this._query);
    }
  }

  add(item:any) : Promise {
    return new Promise((resolve, reject) => {
      let query = this._query.ref().push();
      query.set(item, (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(item);
      });
    });
  }

  remove(item: any): Promise {
    if (item === null || item.__firebaseKey__ === null) {
      return Promise.reject({message: 'Unknown item'});
    }
    return this.removeByKey(item.__firebaseKey__);
  }

  getByKey(key): any {
    return this._valueMap.get(key);
  }

  removeByKey(key) {
    return new Promise((resolve, reject) => {
      this._query.ref().child(key).remove((error) =>{
        if (error) {
          reject(error);
          return;
        }
        resolve(key);
      });
    });
  }

  clear() {
    //this._stopListeningToQuery(this._query);
    return new Promise((resolve, reject) => {
      let query = this._query.ref();
      query.remove((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  _fetchQuery(query) {
    query.on('value', (snapshot) => {
      this._onValue(snapshot);
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

  _onValue(snapshot) {
    let value = this._valueFromSnapshot(snapshot);
    let index = 0;
    this._valueMap.set(value.__firebaseKey__, value);
    this.items.splice(index, 0, value);
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
