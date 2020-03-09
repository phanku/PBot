/**
 * Provides all inventory methods needed for a character.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.27.0_030_b319636_2020-03-09_16:06:43
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
import { C } from "../../game/Constants";
import { _ } from 'underscore';
import Communications from "../../game/Communications";

/**
 * Provides character inventory methods.
 */
export let Inventory = {

    // Determines if the potion names have been compiled.
    potionNamesCompiled: false,

    // Stores all of the potion names to be used for calculating all of the potions the current character has.
    potionNames: {},

    /**
     * Sends the specified amount of gold to the specified receiver.
     * @param receiver The character.
     * @param gold The amount of gold.
     */
    sendGold(receiver, gold) {
        send_gold(receiver, gold);
    },

    /**
     * Returns the amount of gold the character is currently holding.
     * @return {number}
     */
    getGold() {
        return character.gold;
    },

    /**
     * Returns the number of empty inventory slots the character currently has.
     * @return {number}
     */
    getEmptyInventorySlotCount() {
        return character.esize;
    },

    /**
     * Compiles all of the `INV_NAME`s from the constants variable for potions.
     */
    compileAllPotionList() {
        this.potionNames = _.union(
            _.pluck(C.POTION.HP.SIZE, 'INV_NAME'),
            _.pluck(C.POTION.MP.SIZE, 'INV_NAME')
        );
    },

    /**
     * Returns the number of the specified items in inventory.
     * @param name The item to find.
     * @return {number}
     */
    getItemQuantity(name) {
        let item = character.items.find(item => item !== null && item.name === name);

        if (item) {
            return item.q;
        }

        return 0;
    },

    /**
     * Returns an object containing the current count of potions in inventory.
     * @return {{}}
     */
    getPotionCounts() {
        // Compile the list of potion names if it has not yet been compiled.
        if (!this.potionNamesCompiled) {
            this.compileAllPotionList();
        }

        let counts = {
            HP: 0,
            MP: 0
        };

        _.each(C.POTION, (potion) => {
            let total = 0;
            _.each(potion.SIZE, (size) => {
                counts[size.INV_NAME] = this.getItemQuantity(size.INV_NAME);
                total += counts[size.INV_NAME];
            });
            counts[potion.NAME] = total;
        });

        return counts;
    },

    /**
     * Determines the counts for the highest potion types in the character's inventory.
     * @param type Determines if ht eMP or the HP potions count should be returned.
     * @returns {string}
     */
    getHighestPotion(type) {
        if (!type) {return '';}

        let item = '';
        $(type.SIZE).each((i, potion) => {
            console.log(potion);
            // item = character.items.find((item) => item.name === potion.INV_NAME);
            // if (!_.isEmpty(item)) {
            //     return false;
            // }
        });

        return item;
    }
};