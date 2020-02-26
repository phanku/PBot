/**
 * Provides running progress information.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const C = require('../../game/Constants');
const Communications = require('../../game/Communications').default;
const Logger = require('../../game/logger/Logger').default;

/**
 * Provides the statistics of the character.
 */
export default class Statistics {

    /**
     * Handles any actions that need to be taken when the character levels up.
     */
    static levelUpHandler() {
        // Need to reset the xp start timestamp as well as the current xp generated or the xp per second and the
        // eta to level numbers will be incorrect after the character levels up.
        this._xpStart = this.getCurrentTimestamp();
        this._stats.xp = 0;
    }

    /**
     * Calculates the number of seconds the bot has been running.
     * @return {number}
     */
    static getBotRunningTime() {
        return this.getCurrentTimestamp() - this._botStartTime;
    }

    /**
     * Calculates the number of seconds since last level or bot started.
     * @return {number}
     */
    static getXPRunningTime() {
        return this.getCurrentTimestamp() - this._xpStartTime;
    }

    /**
     * Returns the current XP per second the character is making.
     * @return {number}
     */
    static getXPPerSecond() {
        return Math.round((character.xp - this._stats.xp) / this.getXPRunningTime());
    }

    /**
     * Returns the amount of XP left needed to level.
     * @return {number}
     */
    static getXPNeededToLevel() {
        return character.max_xp - character.xp;
    }

    /**
     * Returns the estimated time to when the character will level.
     * This function will return a format of: HH:mm:ss
     * @return {string}
     */
    static getETAToLevel() {
        let date = new Date(null),
            seconds = Math.round(this.getXPNeededToLevel() / this.getXPPerSecond());

        if (seconds === Infinity) {
            return "Infinity";
        }

        date.setSeconds(seconds);

        // date.setSeconds();
        return date.toISOString().substr(11, 8);
    }

    /**
     * Returns an object populated with the character's statistics.
     * @returns {{gold: *, xpps: *, xppsUpdate: {y: *, time: *}, dps: number, tk: *,
     *              eta2l: *, gps: number, kps: string}}
     */
    static getStatistics() {
        return {
            xppsUpdate: {
                time: this.getBotRunningTime(),
                y: this.getXPPerSecond()
            },
            dps: this.getDamagePerSecond(),
            xpps: this.getXPPerSecond(),
            gps: this.getGoldPerSecond(),
            gold: character.gold,
            eta2l: this.getETAToLevel(),
        };
    }

    /**
     * Returns the gold per second the character is generating.
     * @returns {number}
     */
    static getGoldPerSecond() {
        return Math.round(this._runningStats[C.STATS.TYPE.GOLD].map(item => item.d)
            .reduce((total, damage) => total + damage, 0) / C.STATS.TIMEOUT.GOLD);
        // return Math.round((character.gold - this._stats.gold) / this.getBotRunningTime());
    }

    /**
     * Returns the damage per second the character is generating.
     * @returns {number}
     */
    static getDamagePerSecond() {
        return Math.round(this._runningStats[C.STATS.TYPE.DAMAGE].map(item => item.d)
            .reduce((total, damage) => total + damage, 0) / C.STATS.TIMEOUT.DAMAGE);
    }

    /**
     * Returns a stat object.
     * @param amount The stat.
     * @returns {{d: *, ts: number}}
     */
    static statFactory(amount) {
        return {
            // The damage.
            d: amount,
            // When the damage was done.
            ts: Math.floor(new Date().getTime() / 1000)
        }
    }

    /**
     * Records the specified amount under the specified stat.
     * @param stat The stat.
     * @param amount The amount.
     */
    static recordStat(stat, amount) {
        this._runningStats[stat].push(this.statFactory(amount));
        this.garbageCollectStat(stat);
    }

    /**
     * Garbage collects the running stats collection
     * @param stat The stat to garbage collect.
     */
    static garbageCollectStat(stat) {

        let timeout = 0;

        switch(stat) {
            case C.STATS.TYPE.DAMAGE:
                timeout = C.STATS.TIMEOUT.DAMAGE;
                break;

            case C.STATS.TYPE.GOLD:
                timeout = C.STATS.TIMEOUT.GOLD;
                break;

            case C.STATS.TYPE.XP:
                timeout = C.STATS.TIMEOUT.XP;
                break;
        }

        let now = Math.floor(new Date().getTime() / 1000);
        this._runningStats[stat] = this._runningStats[stat].filter((stat) => (now - stat.ts) < timeout);
    }

    /**
     * Adds event listeners for game events related to the character.
     */
    static bindGameEvents() {
        // Set up event listener for when the character hits its target.
        character.on(C.GAME_ACTION.TARGET_HIT,  (data) =>  {
            // Record how much damage was done.
            this.recordStat(C.STATS.TYPE.DAMAGE, data.damage);
            // Broadcast the new DPS rate.
            Communications.broadcast(Communications.getBroadcastObject(C.COMMS.STATS.DAMAGE_PER_SECOND,
                {dps: this.getDamagePerSecond()}, this));
        });

        // Set up event listener for when the character loots.
        character.on(C.GAME_ACTION.LOOT, (data) => {
            this.recordStat(C.STATS.TYPE.GOLD, data.gold);
            // Broadcast the new gold level and gold per second.
            this.broadcastStatistics();
        });

        // Binding on the character level up event.
        character.on(C.GAME_ACTION.LEVEL_UP, (data) => {
            // The character has leveled up.
            // Have to reset some values or the XP per second as well as the ETA to level.
            this.levelUpHandler();
            this.broadcastStatistics();
        });
    }

    /**
     * Returns the current timestamp in seconds.
     * @return {number}
     */
    static getCurrentTimestamp() {
        return Math.floor(Date.now() / 1000);
    }

    /**
     * Starts the interval in which to update the hud.
     */
    static startUpdateInterval() {
        setInterval(()=>{this.broadcastStatistics()}, C.STATS.UPDATE_INTERVAL * 1000);
    }

    /**
     * Causes the hud to update.
     */
    static broadcastStatistics() {
        Communications.broadcast(Communications.getBroadcastObject(C.COMMS.STATS.UPDATE, this.getStatistics(), this));
    }

    /**
     * Handles the broadcasts transmitted by the communications module.
     * @param broadcast The broadcast.
     */
    static broadcastHandler(broadcast) {}

    /**
     * Initializes the stats module.
     */
    static init() {
        // Initializing the default configurations.
        this._stats = {
            xp: character.xp,
            gold: character.gold,
            damage: 0,
            deaths: 0
        };

        // Initializing the default running stats.
        this._runningStats = {};
        this._runningStats[C.STATS.TYPE.DAMAGE] = [];
        this._runningStats[C.STATS.TYPE.GOLD] = [];
        this._runningStats[C.STATS.TYPE.XP] = [];

        this._botStartTime = this.getCurrentTimestamp();
        this._xpStartTime = this.getCurrentTimestamp();
        this._characterName = parent.character.name;

        Communications.subscribe((broadcast) => {
            this.broadcastHandler(broadcast);
        });

        this.bindGameEvents();

        // Wait for the character to fully come online before doing anything.
        setTimeout(()=>{
            this.startUpdateInterval();
        }, 500);
    }
};

Statistics.init();