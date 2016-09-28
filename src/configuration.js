import * as firebase from 'firebase';
/**
 * The default configuration
 */
export class ConfigurationDefaults {

}

ConfigurationDefaults._defaults = {
  apiKey: null,
  authDomain: null,
  databaseUrl: null,
  monitorAuthChange: false
};

ConfigurationDefaults.defaults = function() {
  let defaults = {};
  Object.assign(defaults, ConfigurationDefaults._defaults);
  return defaults;
};

/**
 * Configuration class used by the plugin
 */
export class Configuration {

  /**
   * Initializes a new instance of the Configuration class
   * @param {Object} innerConfig - The optional initial configuration values. If not provided will initialize using the defaults.
   */
  constructor(innerConfig) {
    this.innerConfig = innerConfig;
    this.values = this.innerConfig ? {} : ConfigurationDefaults.defaults();
  }

  /**
   * Gets the value of a configuration option by its identifier
   * @param {string} identifier - The configuration option identifier
   * @returns {any} - The value of the configuration option
   * @throws {Error} - When configuration option is not found
   */
  getValue(identifier) {
    if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
      return this.values[identifier];
    }
    if (this.innerConfig !== null) {
      return this.innerConfig.getValue(identifier);
    }
    throw new Error('Config not found: ' + identifier);
  }

  /**
   * Sets the value of a configuration option
   * @param {string} identifier - The key used to store the configuration option value
   * @param {any} value - The value of the configuration option
   * @returns {Configuration} - The current configuration instance (Fluent API)
   */
  setValue(identifier, value) {
    this.values[identifier] = value;
    return this; // fluent API
  }

  /**
   * Gets the value of the Firebase API key configuration option
   * @returns {string} - The value of the API key configuration option
   */
  getApiKey() {
    return this.getValue('apiKey');
  }

  /**
   * Sets the value of the Firebase API Key configuration option
   * @param {string} databaseUrl - An key for a valid Firebase project
   * @returns {Configuration} - Returns the configuration instance (fluent API)
   */
  setApiKey(apiKey) {
    return this.setValue('apiKey', apiKey);
  }

  /**
   * Gets the value of the Firebase Auth Domain configuration option
   * @returns {string} - The value of the authDomain configuration option
   */
  getAuthDomain() {
    return this.getValue('authDomain');
  }

  /**
   * Sets the value of the Firebase Auth Domain configuration option
   * @param {string} databaseUrl - A URL to a valid Firebase authDomain location
   * @returns {Configuration} - Returns the configuration instance (fluent API)
   */
  setAuthDomain(authDomain) {
    return this.setValue('authDomain', authDomain);
  }

  /**
   * Gets the value of the Firebase database URL configuration option
   * @returns {string} - The value of the databaseUrl configuration option
   */
  getDatabaseUrl() {
    return this.getValue('databaseUrl');
  }

  /**
   * Sets the value of the Firebase database URL configuration option
   * @param {string} databaseUrl - A URL to a valid Firebase database location
   * @returns {Configuration} - Returns the configuration instance (fluent API)
   */
  setDatabaseUrl(databaseUrl) {
    return this.setValue('databaseUrl', databaseUrl);
  }

  /**
   * Gets the value of the monitorAuthChange configuration option
   * @returns {boolean} - The value of the monitorAuthChange configuration option
   */
  getMonitorAuthChange() {
    return this.getValue('monitorAuthChange');
  }

  /**
   * Sets the value of the monitorAuthChange configuration option
   * @param monitorAuthChange
   * @returns {Configuration} - Returns the configuration instance (fluent API)
   */
  setMonitorAuthChange(monitorAuthChange: boolean = true) {
    return this.setValue('monitorAuthChange', monitorAuthChange === true);
  }

  initialize() {
    if (!this.values.apiKey && (!this.values.authDomain || this.values.databaseURL)) {
      throw Error('Configuration has not been set');
    } else {
      firebase.initializeApp(this.values)
    }
  }
}
