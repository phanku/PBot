/**
 * Provides the ranger character class.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const Character = require('./common/Character').default;
const Logger = require('../game/logger/Logger').default;

/**
 * The mage character class.
 */
export default class Ranger extends Character {

    /**
     * Mage constructor
     */
    constructor() {
        // Calling the constructor for the parent class.
        super();

        // Setting the default behavior for the character class.
        this.classRun = require('./common/directives/RangeAttack');

        // Logging debug message.
        Logger.log(Logger.DEBUG, "Mage character loaded.");
    }
};
