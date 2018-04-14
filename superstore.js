'use strict';

const ElectronStore = require('electron-store');

/**
 * A class whose sole purpose is to override the ElectronStore get(...)
 * method to add a key to the store if the key is not found. This makes
 * it trivial to restore the contents of the store to its default values
 * by deleting the file that the store class provides access to. Individual
 * elements of the stored file may even be deleted so that only those
 * elements are reset to their default values when the app that owns the
 * store is restarted.
 * 
 * @extends ElectronStore
 * @author Shay Gordon
 */
class SuperStore extends ElectronStore {
    /**
     * Creates a new SuperStore instance. Passes supplied options to the
     * ElectronStore constructor.
     * 
     * @param {object} opts ElectronStore options.
     */
	constructor(opts) {
		super(opts);
	}

    /**
     * Returns the value assigned to a key. If the key is not found, a default
     * value is returned, and this key/value is added to the store.
     * 
     * @param {string} key Key.
     * @param {any} defaultValue Value returned if the key was not found.
     */
	get(key, defaultValue) {
        let value = super.get(key);
        if (value === undefined) {
            super.set(key, value = defaultValue);
        }
        return value;
	}
}

module.exports = SuperStore;
