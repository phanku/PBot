/**
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.4_008_caded2a_2020-02-24_15:12:16
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

let C = require('./Constants');

module.exports = {
    /** Stores reference to the character. */
    _character: null,
    /** Stores bot version. */
    _botVersion: '',

    /**
     * Reports to the game log the current version of the bot.
     */
    reportBotVersion() {
        game_log('-- PBot -- V: ' + this._botVersion);
    },

    /**
     * Sets the current version of the bot.
     */
    setBotVersion() {
        // Loading the version text file.
        let version = require('./version.txt');
        // Reformatting the version number for display in HUD and in game log.
        version = version.split('_').splice(0,2).join('_');
        // Do not put the `@` and `version ` together in the next statement or the auto version will
        // tear it apart. 
        this._botVersion = version.split('@' + 'version ').join('');
    },

    /**
     * Initializes the bot.
     * @param character The character the bot is running.
     * @param $ A reference to the game's jquery instance.
     */
    init(character, $) {
        this.setBotVersion();
        this.reportBotVersion();
        this._character = character;
    },
}
