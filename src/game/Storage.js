/**
 * PBot storage.
 * Provides the local storage functionality needed for PBot.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const Lockr = require('lockr/lockr.min');
const Logger = require('./logger/Logger').default;

// Defines the prefix for all of the keys within the local storage.
Lockr.prefix = 'PBot_';

/**
 * Provides PBot's main way to store data between game sessions.
 * @todo Add a way to store settings among multiple machines that play the game.
 */
export default class Storage {

    /**
     * Sets a PBot global variable.
     * @param key The key.
     * @param value The value.
     */
    static setGlobal(key, value) {
        Lockr.set(key, value);
    }

    /**
     * Gets a PBot global variable.
     * @param key The key.
     * @returns {*}
     */
    static getGlobal(key) {
        return Lockr.get(key, null);
    }

    /**
     * Sets, a character level, value in the local storage under the key.
     * @param key The key.
     * @param value The value.
     */
    static set(key, value) {
        this.setGlobal(character.name + '_' + key, value);
    }

    /**
     * Returns the, character level, value of the specified key, or null.
     * @param key
     * @return {*}
     */
    static get(key) {
        return this.getGlobal(character.name + '_' + key);
    }

    /**
     * Initializes the storage module.
     */
    static init() {
        Logger.log(Logger.DEBUG, 'Storage initialized.');
    }
};

// Initializing the storage module.
Storage.init();