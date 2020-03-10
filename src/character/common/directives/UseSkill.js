/**
 * Provides the directive to cause the character to use a skill.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.27.0_032_c75b903_2020-03-10_16:26:52
 * @since 0.26.0_017_75f2a70_2020-02-26_12:26:24
 */


// Imports.
// const C = require('../../../game/Constants');
// import Logger from "../../../game/logger/Logger";
// const Logger = require('../../../game/logger/Logger').default;
import { C } from '../../../game/Constants';

/**
 * Provides the skill usage behavior.
 * @param bot The character.
 * @param skill The skill.
 */
export default (bot, skill) => {
    return {

        calculateDamage(dpmp, mp) {
            return dpmp * mp;
        },

        canKillTarget(target, damage) {

        },

        run() {

            if (is_on_cooldown(skill.MACHINE) || !bot._target) {
                return;
            }

            if (typeof DPMP !== 'undefined' && DPMP)
            use_skill(skill, bot._target);
        }
    };
};
