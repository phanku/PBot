/**
 * Provides the range attack behavior for characters.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.27.0_032_c75b903_2020-03-10_16:26:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

/**
 * Provides the range attack behavior for characters.
 * @param bot The character.
 */
export default (bot) => {
    return {
        run() {

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

            if (character.mp === 0) {
                return;
            }

            // Is the character attacking something?
            bot._target = get_targeted_monster();

            // Execute the main targeting/attacking routine.
            if (bot._target && can_attack(bot._target)) {
                attack(bot._target);
                return;
            }

            if (bot._config.attackActive && bot._config.closestTarget) {

            }


            if (bot._config.attackActive) {

                if (!bot._target) {
                    bot._target = get_nearest_monster({
                        max_att: bot._config.maxAtt
                    });
                }

                if (bot._target) {
                    change_target(bot._target);
                } else {
                    set_message("No Monsters");
                    return;
                }
            }


            // Execute the main targeting/attacking routine.
            if (bot._target) {

                if (can_attack(bot._target)) {
                    attack(bot._target);
                    return;
                }

                // console.log(this._config.closestTarget);
                // Change to the closest target if the current target is out of range and
                // the closest target configuration is on.
                if (!is_in_range(bot._target) && bot._config.closestTarget) {
                    bot._target = get_nearest_monster({
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
        }
    };
};