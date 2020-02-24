/**
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

let C = require('./Constants');

module.exports = {

    $: null,
    character: null,
    botVersion: '',
    // hud: require('./hud/Hud'),

    
    getHud() {
        return this.hud;
    },

    /**
     * Reports to the game log the current version of the bot.
     */
    reportBotVersion() {
        game_log('-- PBot -- V: ' + this.botVersion);
    },

    /**
     * Sets the current version of the bot.
     */
    setBotVersion() {
        let version = require('./version.txt');
        version = version.split('_').splice(0,2).join('_');
        // Do not put the `@` and `version ` together in the next statement or the auto version will
        // tear it apart. 
        this.botVersion = version.split('@' + 'version ').join('');
    },

    /**
     * Initializes the bot.
     * @param character The character the bot is running.
     * @param $ A reference to the game's jquery instance.
     */
    init(character, $) {
        this.setBotVersion();
        this.reportBotVersion();
        this.character = character;
        // this.hud.init($, this.botVersion, this.character);
    },
}
