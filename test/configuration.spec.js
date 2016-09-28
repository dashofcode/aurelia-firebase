import {Configuration} from '../src/configuration';

describe('Configuration', () => {
  it('should have default values', () => {
    let config = new Configuration();
    expect(config.getDatabaseURL()).toBeNull();
    expect(config.getMonitorAuthChange()).toBe(false);
  });

  it('should be configurable', () => {
    let config = new Configuration();
    expect(config.setDatabaseURL('https://google.com')).toBe(config); // fluent api check
    expect(config.getDatabaseURL()).toBe('https://google.com');

    config = new Configuration();
    expect(config.setMonitorAuthChange(true)).toBe(config); // fluent api check
    expect(config.getMonitorAuthChange()).toBe(true);
  });

  it('should never change the defaults', () => {
    let config1 = new Configuration();
    let config2 = new Configuration();

    expect(config2.getDatabaseURL()).toBeNull();
    config1.setDatabaseURL('https://google.com');
    expect(config2.getDatabaseURL()).toBeNull();
  });

  it('should get values on the parent when it does not have a value itself', () => {
    let parentConfig = new Configuration();
    parentConfig.setValue('test', 'a');
    let config = new Configuration(parentConfig);
    expect(config.getValue('test')).toBe('a');
  });

  it('should not copy the values when using get but instead delegate to the parent', () => {
    let parentConfig = new Configuration();
    parentConfig.setValue('test', 'a');
    let config = new Configuration(parentConfig);
    expect(config.getValue('test')).toBe('a');

    parentConfig.setValue('test', 'b');
    expect(config.getValue('test')).toBe('b');
  });

  it('should allow to override parents with own values', () => {
    let parentConfig = new Configuration();
    parentConfig.setValue('test', 'a');
    let config = new Configuration(parentConfig);
    expect(config.getValue('test')).toBe('a');

    config.setValue('test', 'c');
    parentConfig.setValue('test', 'a');
    expect(config.getValue('test')).toBe('c');

  });
});
