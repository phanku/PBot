/**
 * Base character operations object.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const C = require('../../game/Constants');
const Logger = require('../../game/logger/Logger').default;
const Storage = require('../../game/Storage').default;
const Communications = require('../../game/Communications').default;
const Statistics = require('./Statistics').default;

/**
 * The parent character class.
 */
export default class Character {

    /**
     * Returns true if the specified entity is an NPC.
     * @param entity The entity to tested.
     * @return {boolean}
     */
    isNPC(entity) {
        return entity && (entity.npc || entity.type === C.OBJECTS.NPC);
    }

    /**
     * Returns true if the specified entity is a monster.
     * @param entity The entity to be tested.
     * @returns {boolean}
     */
    isMonster(entity) {
        return entity && entity.type === C.OBJECTS.MONSTER;
    }

    /**
     * Returns true if the specified entity is a player.
     * @param entity The entity to be tested.
     * @returns {*|boolean}
     */
    isCharacter(entity) {
        return entity && !isNPC(entity) && entity.type === C.OBJECTS.CHARACTER;
    }

    /**
     * Returns true if the character is moving.
     * @return {boolean}
     */
    isMoving() {
        return !this.isDead && is_moving(character);
    }

    /**
     * Returns true if the character is dead.
     * @return {boolean}
     */
    isDead() {
        return character.rip;
    }

    /**
     * Returns the number of health or mana points the character is missing.
     * @param type The type of points.
     * @returns {number} The number of points.
     */
    getPointsMissing(type)
    {
        switch(type)
        {
            case C.POTION.HP.NAME:
                return character.max_hp - character.hp;

            case C.POTION.MP.NAME:
                return character.max_mp - character.mp;

            default:
                Logger.log(Logger.ERROR, "Bad potion type.");
        }
    }

    /**
     * Returns the number of points that need to be missing for consideration of consuming potion.
     * @param type The type of points.
     * @returns {number}
     */
    getTriggerPoint(type) {
        switch(type)
        {
            case C.POTION.HP.NAME:
                return character.max_hp * ((100 - this._config.hpPotionTrigger) / 100);

            case C.POTION.MP.NAME:
                return character.max_mp * ((100 - this._config.mpPotionTrigger) / 100);

            default:
                alert('error!');
        }
    }

    /**
     * Returns true if the current character needs a potion of the specified type.
     * @param potionType The potion type.
     * @returns {boolean}
     */
    doesNeedPotion(potionType) {
        return this.getPointsMissing(potionType) >= this.getTriggerPoint(potionType);
    }

    /**
     * Updates the character's settings with the new
     * @param newConfigs
     */
    updateConfigs(newConfigs) {
        this._config = {
            attackActive: newConfigs.attackActive,
            closestTarget: newConfigs.closestTarget,
            maxAtt: newConfigs.maxAtt,
            hpPotionTrigger: newConfigs.hpPotionTrigger,
            mpPotionTrigger: newConfigs.mpPotionTrigger
        };

        Logger.log(Logger.DEBUG, "Configurations updated.");
    }

    /**
     * Handles
     * @param broadcast
     */
    broadcastHandler(broadcast) {
        switch(broadcast.context) {
            // Handle any communication from the HUD.
            case C.COMMS.HUD.SETTING_UPDATE:
                this.updateConfigs(broadcast.payload);
                break;
        }
    }

    /**
     * Default character run algorithm.
     */
    characterRun() {

        // Loot any chests waiting to be looted.
        loot();

        // Consume a potion if the potion consumed cool down is not active and there is a need to
        // consume a potion.
        if (!is_on_cooldown('use_mp')
            && (this.doesNeedPotion(C.POTION.HP.NAME) || this.doesNeedPotion(C.POTION.MP.NAME))) {

            // Consume the potion.
            use_hp_or_mp();

            // Broadcast the updated potion numbers.
            Communications.broadcast(
                Communications.getBroadcastObject(
                    C.COMMS.CHARACTER.POTION_CONSUMPTION,
                    this._inventory.getPotionCounts(),
                    this
                ));

            // Log the debug message.
            Logger.log(Logger.DEBUG, "Potion consumed.");
        }
    }

    /**
     * Executes the code that controls the specific character class.
     * @stubbed Stubbed as this method is overridden by a sub class.
     */
    classRun() {}

    /**
     * Initializes the main character class.
     */
    constructor() {
        // Initializing the configurations.
        this._config = {
            attackActive: false,
            closestTarget: false,
            maxAtt: 600,
            hpPotionTrigger: 30,
            mpPotionTrigger: 30
        };

        // Initializing the current _status of the character.
        this._status = {
            // Determines the target of the character.
            target: "",
            targetType: "",
            isAttacking: false
        };

        // Loading the inventory module.
        this._inventory = require('./Inventory');

        // Subscribe to the communications hub.
        Communications.subscribe((broadcast)=>{
            this.broadcastHandler(broadcast);
        });

        // Starting the main character loop.
        setInterval(()=> {
            this.characterRun();
            this.classRun(this);
        }, 1000/6);
    }
};