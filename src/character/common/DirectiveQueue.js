/**
 * Provides the directive priority queue for the character.
 * @author Joseph Pahl
 * @version 0.27.0_031_a71f985_2020-03-10_13:02:36
 * @since
 * @package PBot
 */

/**
 * Provides the directive queue for the character.
 */
export default class DirectiveQueue {


    enqueue(directive) {
        this._data.unshift(directive);
    }

    dequeue(directive) {
        this._data.pop();
    }

    peek() {
        return this._data[0];
    }

    size() {
        return this._data.length;
    }

    reset() {
        this._data = [];
    }

    isEmpty() {
        return this._data.length === 0;
    }

    getQueue() {
        return this._data;
    }

    constructor() {
        this._data = [];
    }
}
