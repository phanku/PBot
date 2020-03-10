/**
 * Provides the mage character class.
 * Note: Very alpha character.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.29.0_035_68a74ce_2020-03-10_19:40:00
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
import Character from "./common/Character";
import Logger from "../game/logger/Logger";
import { C } from "../game/Constants";

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
        this.directives.enqueue(require('./common/directives/RangeAttack').default(this));
        // this.directives.enqueue(require('./common/directives/UseManaBurst').default(this));

        // Hello World, Omg.
        // Just because
        // Why not?


        // Logging debug message.
        Logger.log(Logger.DEBUG, "Mage character loaded.");
    }
};
