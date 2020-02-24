/**
 * Provides the priest character class.
 * Note: Very alpha character.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.23.0_010_2d26b9b_2020-02-24_15:18:07
 * @since 0.23.0_010_2d26b9b_2020-02-24_15:18:07
 */

// Imports.
const Character = require('./common/Character').default;
const Logger = require('../game/logger/Logger').default;

/**
 * The priest character class.
 */
export default class Priest extends Character {

    /**
     * Priest constructor
     */
    constructor() {
        // Calling the constructor for the parent class.
        super();

        // Setting the default behavior for the character class.
        this.classRun = require('./common/directives/RangeAttack');

        // Logging debug message.
        Logger.log(Logger.DEBUG, "Priest character loaded.");
    }
};
