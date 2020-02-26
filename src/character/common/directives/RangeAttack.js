/**
 * Provides the range attack behavior for characters.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
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



    if (bot._config.attackActive && bot._config.closestTarget) {

    }

    // Is the character attacking something?
    let target = get_targeted_monster();

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