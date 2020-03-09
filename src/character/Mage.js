/**
 * Provides the mage character class.
 * Note: Very alpha character.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.27.0_030_b319636_2020-03-09_16:06:43
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
import Character from "./common/Character";
import Logger from "../game/logger/Logger";

export class Mage {

    constructor() {
        this.a = [];

        this.a.push(require('./common/directives/RangeAttack')('test'));
        this.a[0].run();
    }
}

// /**
//  * The mage character class.
//  */
// export class Mage extends Character {
//
//     /**
//      * Mage constructor
//      */
//     constructor() {
//         // Calling the constructor for the parent class.
//         super();
//
//         // Setting the default behavior for the character class.
//         this.classRun = require('./common/directives/RangeAttack');
//
//         // Logging debug message.
//         Logger.log(Logger.DEBUG, "Mage character loaded.");
//     }
// };
