/**
 * Provides the logging service for PBot.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Requiring the CSS needed for the logger.
require('./logger.scss');

// Exporting the class.
export default class Logger {

    /**
     * Returns the log level `NONE`.
     * @return {number}
     */
    static get NONE() {
        return 0;
    }

    /**
     * Returns the log level `DEBUG`.
     * @return {number}
     */
    static get INFO() {
        return 1;
    }

    /**
     * Returns the log level `ERROR`.
     * @return {number}
     */
    static get ERROR() {
        return 2;
    }

    /**
     * Returns the log level `WARN`.
     * @return {number}
     * @constructor
     */
    static get WARN() {
        return 3;
    }

    /**
     * Returns the log level `INFO`.
     * @return {number}
     * @constructor
     */
    static get DEBUG() {
        return 4;
    }

    /**
     * Returns the current logging level.
     * @returns {number}
     */
    static get logLevel() {
        // noinspection JSUnresolvedVariable
        return this._logLevel;
    }

    /**
     * Sets the current logging level.
     * @param value The logging level.
     */
    static set logLevel(value) {
        this._logLevel = value;
    }

    /**
     * Gets the configuration that determines if the logs should also be sent to the browser console.
     * @return {boolean}
     */
    static get logToConsole() {
        // noinspection JSUnresolvedVariable
        return this._logToConsole;
    }

    /**
     * Sets the configuration that determines if the logs should also be sent to the browser console.
     * @param value
     */
    static set logToConsole(value) {
        this._logToConsole = value;
    }

    /**
     * Logs the specified message to the console.
     * @param level The log message level.
     * @param message The message.
     */
    static logConsole(level, message) {
        switch(level) {
            case this.INFO:
                console.log(message);
                break;

            case this.ERROR:
                console.error(message);
                break;

            case this.WARN:
                console.warn(message);
                break;

            case this.DEBUG:
                console.log('PBD: ' + message);
                break;
        }
    }

    /**
     * Returns the message wrapped with the appropriate HTML tag.
     * @param level The level.
     * @param message The message.
     * @return {jQuery|string}
     */
    static wrapMessage(level, message) {
        return $('<span></span>', {'class': 'pb-log-' + level}).text(message).html();
    }

    /**
     * Attempts to log the specified message to the game log.
     * @param level The level of the message.
     * @param message The message.
     */
    static log(level, message) {
        // noinspection JSUnresolvedVariable
        if (this._logLevel === Logger.NONE || level > this._logLevel) {return;}

        // noinspection JSUnresolvedVariable
        if (this._logToConsole) {
            this.logConsole(level, message);
        }

        // noinspection JSUnresolvedFunction
        game_log(this.wrapMessage(level, message));
    }

    /**
     * Initializes the logger.
     */
    static init() {
        this._logLevel = this.DEBUG;
        this._logToConsole = true;
        this.log(this.DEBUG, 'Logger initialized.');
    }
};

// Initializes the logger.
Logger.init();