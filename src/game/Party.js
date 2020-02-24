/**
 * Provides the party management features.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const C = require('./Constants');
const lockr = require('lockr/lockr.min');

module.exports = {

    game: null,
    hud: null,
    character: null,
    isLeader: false,
    partyLeader: '',
    partyMembers: [],
    autoJoinMembers: true,

    loadPartySettings() {
        this.isLeader = lockr.get('partyIsLeader', false);
        this.partyLeader = lockr.get('partyPartyLeader', '');
        this.partyMembers = lockr.get('partyPartyMembers', []);
        this.autoJoinMembers = lockr.get('partyAutoJoinMembers', false);
    },

    updateHud() {

    },

    init(game, hud, character) {

        this.game = game;
        this.hud = hud;
        this.character = character;
        this.hud.init($, this.botVersion, this.character);
    }
};
