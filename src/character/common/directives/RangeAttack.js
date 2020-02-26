/**
 * Provides the range attack behavior for characters.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.23.0_013_44f84ac_2020-02-26_09:44:59
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const C = require('../../../game/Constants');
const Logger = require('../../../game/logger/Logger').default;

/**
 * Provides the range attack behavior for characters.
 * @param bot The character.
 */
module.exports = (bot) => {

    /**
     * What actions should happen here?
     *
     * - Determine if the character is being hit?
     *      - If so what actions should be taken if possible?
     *      - Is the character in a party? Is there a tank present in the party?
     *          - Maybe move this character to behind the tank?
     * - Does the character currently have a target?
     *      - Keep attacking that target.
     * - Has the user turned on auto attack?
     *      - Does the character have a target?
     *          - Is the target within range?
     * - How many mobs has the character already targeted?
     *
     */
        // Is the character attacking something?
    let target = get_targeted_monster();

    // Execute the main targeting/attacking routine.
    if (target && can_attack(target)) {
        attack(target);
        return;
    }

    if (bot._config.attackActive && bot._config.closestTarget) {

    }



    if(bot._config.attackActive) {

        if (!target) {
            target = get_nearest_monster({
                max_att: bot._config.maxAtt
            });
        }

        if(target) {
            change_target(target);
        } else {
            set_message("No Monsters");
            return;
        }
    }


    // Execute the main targeting/attacking routine.
    if (target) {

        if (can_attack(target)) {
            attack(target);
            return;
        }

        // console.log(this._config.closestTarget);
        // Change to the closest target if the current target is out of range and
        // the closest target configuration is on.
        if (!is_in_range(target) && bot._config.closestTarget) {
            target = get_nearest_monster({
                max_att: bot._config.maxAtt
            });

            return;
        }

        // if(!is_in_range(target)) {
        //     move(
        //         character.x + (target.x - character.x) / 24,
        //         character.y + (target.y - character.y) / 24,
        //     );
        // }
    }
};