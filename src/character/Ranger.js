/**
 * Provides the ranger character class.
 * Note: Very alpha character.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.23.0_010_2d26b9b_2020-02-24_15:18:07
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const Character = require('./common/Character').default;
const Logger = require('../game/logger/Logger').default;

/**
 * The ranger character class.
 */
export default class Ranger extends Character {

    /**
     * Ranger constructor
     */
    constructor() {
        // Calling the constructor for the parent class.
        super();

        // Setting the default behavior for the character class.
        this.classRun = require('./common/directives/RangeAttack');

        // Logging debug message.
        Logger.log(Logger.DEBUG, "Ranger character loaded.");
    }
};
