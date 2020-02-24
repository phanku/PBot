/**
 * Provides the communications hub between the objects in PBot.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const Logger = require('./logger/Logger').default;

/**
 * Provides the communications hub for PBot.
 */
export default class Communications {

    /**
     * Returns an object that should be used for broadcasting in this object.
     * @param context The context of the broadcast.
     * @param payload The payload of the broadcast.
     * @param broadcaster Reference to the object that sent the broadcast.
     * @returns {{data: *, context: *, from: *, timestamp: number}}
     */
    static getBroadcastObject(context, payload, broadcaster) {
        return {
            context: context,
            from: broadcaster,
            payload: payload,
            timestamp: Date.now()
        };
    }

    /**
     * Allows a class to provide a callback function that will be executed when a message is broad casted.
     * @param callback The callback function.
     */
    static subscribe(callback) {
        this._observers.push(callback);
    }

    /**
     * Broadcasts the specified data to all of the observers callbacks.
     * @param broadcast The broadcast.
     */
    static broadcast(broadcast) {
        if (this._observers.length === 0) {
            return;
        }

        this._observers.forEach(observer => observer(broadcast));
    }

    /**
     * Initializes the notifications class.
     */
    static init() {
        // Initializing the observers array.
        this._observers = [];
        Logger.log(Logger.DEBUG, 'Coms initialized.');
    }
};

// Initializing the communications hub.
Communications.init();
