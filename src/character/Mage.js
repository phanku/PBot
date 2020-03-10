/**
 * Provides the mage character class.
 * Note: Very alpha character.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.27.0_031_a71f985_2020-03-10_13:02:36
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
import Character from "./common/Character";
import Logger from "../game/logger/Logger";

/**
 * The mage character class.
 */
export class Mage extends Character {

    /**
     * Mage constructor
     */
    constructor() {
        // Calling the constructor for the parent class.
        super();

        // Setting the default behavior for the character class.
        this.directives.enqueue(require('./common/directives/RangeAttack')(this));

        // Logging debug message.
        Logger.log(Logger.DEBUG, "Mage character loaded.");
    }
};
