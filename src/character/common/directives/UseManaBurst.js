/**
 * Provides the directive for using the mana burst skill.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.27.0_032_c75b903_2020-03-10_16:26:52
 * @since 0.27.0_032_c75b903_2020-03-10_16:26:52
 */

// Imports.
import { C } from '../../../game/Constants';

/**
 * Provides the use mana burst skill usage.
 * @param bot
 */
export default (bot) => {
    return {

        shouldUse() {
            return this.calculateDamage() < bot._target.hp;
        },

        calculateDamage() {
            return Math.round(C.SKILLS.MAGE.MANA_BURST.DPMP * character.mp);
        },

        run() {

            if (is_on_cooldown(C.SKILLS.MAGE.MANA_BURST.MACHINE) || !bot._target) {
                return;
            }

            if (!can_attack(bot._target)) {
                return;
            }

            if (character.mp < 200) {
                return;
            }

            if (!this.shouldUse()) {
                return;
            }

            use_skill(C.SKILLS.MAGE.MANA_BURST.MACHINE, bot._target);
        }
    };
};
