/**
 * Initializes PBot.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.26.0_025_13cd16b_2020-03-07_12:08:46
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const C = require('./Constants');
const Hud = require('./hud/Hud').default;
const Storage = require('./Storage').default;
const Logger = require('./logger/Logger').default;
const Communications = require('./Communications').default;
const Party = require('./Party').default;

/**
 * Creates the main PBot object.
 * @type {{init(): void, getBotVersion(): *, getCharacter(*): Character, reportBotVersion(): void}}
 */
const PBot = {

    /**
     * Fetches the PBot version from the `version.txt` file.
     */
    getBotVersion() {
        let version = require('./version.txt');
        version = version.split('_').splice(0,2).join('_');
        // Do not put the `@` and `version ` together in the next statement or the auto version will
        // tear it apart.
        return version.split('@' + 'version ').join('');
    },

    /**
     * Reports PBot's current version to the HUD and the logger.
     */
    reportBotVersion() {
        let botVersion = this.getBotVersion();
        Logger.log(Logger.INFO, '-- <a href="https://github.com/phanku/PBot">PBot</a>: ' + botVersion);
        Communications.broadcast(Communications
            .getBroadcastObject(C.COMMS.GAME.BOT_VERSION, {version: botVersion}, this));
    },

    /**
     * Returns the correct character class object for the character detected.
     * @param ctype The type of the character.
     * @returns {Character}
     */
    getCharacter(ctype) {
        let classType = '',
            character = null;

        switch (ctype) {
            case C.CHARACTER_CLASS.MAGE:
                classType = 'Mage';
                character = require('../character/Mage').default;
                break;

            case C.CHARACTER_CLASS.RANGER:
                classType = 'Ranger';
                character = require('../character/Ranger').default;
                break;

            case C.CHARACTER_CLASS.MERCHANT:
                classType = 'Merchant';
                break;

            case C.CHARACTER_CLASS.PRIEST:
                classType = 'Priest';
                character = require('../character/Priest').default;
                break;

            case C.CHARACTER_CLASS.ROGUE:
                classType = 'Rogue';
                break;

            case C.CHARACTER_CLASS.WARRIOR:
                classType = 'Warrior';
                break;

            default:
                throw "Invalid character type";
        }

        Logger.log(Logger.DEBUG, classType + " character detected.");
        // noinspection JSObjectNullOrUndefined,JSValidateTypes
        return new character();
    },

    /**
     * Initializes PBot.
     */
    init(parent) {
        // Reporting the BOT initializing.
        this.reportBotVersion();
        // Reporting the character name.
        Logger.log(Logger.INFO, "Character: " + parent.character.name);
        // Reporting the character type.
        Logger.log(Logger.INFO, "Character Type: " + parent.character.ctype);
        // Initializing the character class.
        this._character = this.getCharacter(parent.character.ctype);

        Logger.log(Logger.DEBUG, "PBot initialized.");
    }
};

// Initialize the Bot.
PBot.init(parent);
// Export the bot for Webpack.
module.exports = PBot;
