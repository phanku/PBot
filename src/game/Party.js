/**
 * Provides the party management features.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.26.0_025_13cd16b_2020-03-07_12:08:46
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */

// Imports.
const C = require('./Constants');
const Storage = require('./Storage').default;
const Communications = require('./Communications').default;
const Logger = require('./logger/Logger').default;

/**
 * Provides the party management functionality.
 *
 * The party class must handle the following:
 *      - Identify the party leader.
 *      - Identify the members of the party.
 *      - Define the communication protocol between party members.
 *      - Allow commands to be sent to members of the party.
 *      - Handle the propagation of commands from the party to this character.
 *      - Provide effective information passing between party members.
 *      - Save the current party leader for later reloading if/when a reload of the DOM/Browser happens.
 *
 *  Use cases include, but is not limited to:
 *      - Notifies all other members of party when a party leader has been selected.
 *      - Commands party leader to invite member to party when member comes online.
 *      - Commands party member to transfer some, or all gold, to another party member.
 *      - Commands party member to transfer item(s) to another party member.
 *      - Commands all party members to attack a specific target.
 *      - Commands all party members to follow a party member.
 *      - Commands all party members to stop attacking.
 *      - Requests information from a party member.
 *      - Provide information to a party member.
 *      - Commands party member to perform some action, such as commanding a Mage to teleport a member to himself.
 *
 * Rules for communication:
 *      - A party member must only converse with the party leader.
 *      - A party leader shall be able to converse with the entire party.
 */
export default class Party {

    /**
     * Saves the party setting to the local storage.
     * @param key They key in which to store the value under.
     * @param value The value.
     */
    static setPartySetting(key, value) {
        Storage.set('party_' + key, value);
    }

    /**
     * Fetches the party setting from the local storage.
     * @param key They key.
     * @return {*}
     */
    static getPartySetting(key) {
        return Storage.get('party_' + key);
    }

    /**
     * Returns true, if and only if, the character is in a party.
     */
    static isInParty() {
        return parent.party_list.filter(word => parent.character.name === word).length > 0;
    }

    /**
     * Returns true if, and only if, the specified character is the current party leader.
     * @param character The character.
     */
    static characterIsPartyLeader(character) {
        return this.getPartySetting('leader') === character;
    }

    /**
     * Returns true if, and only if, the current character is the party leader.
     * @return {boolean}
     */
    static isPartyLeader() {
        return this.characterIsPartyLeader(character.name);
    }

    /**
     * Adds the specified character to the list of party members.
     * @param character The character.
     */
    static addPartyMember(character) {
        this.setPartyMembers(this.getPartyMembers().push(character));
    }

    /**
     * Removes the specified character from the list of party members.
     * @param character The character to remove from the party members.
     */
    static removePartyMember(character) {
        this.setPartyMembers(this.getPartyMembers().filter(member => member !== character));
    }

    /**
     * Returns the list of party members, and any related information to that character.
     * @return {array}
     */
    static getPartyMembers() {
        return this.getPartySetting('members');
    }

    /**
     * Sets the members for the party.
     * @param members The members
     */
    static setPartyMembers(members) {
        this.setPartySetting('members', members);
    }

    /**
     * Returns the current party leader.
     * @return {string}
     * @stubbed
     */
    static getPartyLeader() {
        return this.getPartySetting('leader');
    }

    /**
     * Sets the specified character as the party leader.
     * @param character The character.
     */
    static setPartyLeader(character) {
        this.setPartySetting('leader', character);
    }

    /**
     * Causes the character to issue a party invite to the specified character.
     * @param character The character to request to invite to a party.
     * @stubbed
     */
    static invitePartyMember(character) {
        send_party_invite(character);
    }

    /**
     * Causes the character to revoke the specified character from the current party.
     * @param character The character to revoke.
     * @stubbed
     */
    static revokePartyMember(character) {}

    /**
     * Causes the character to accept the pending party invite.
     */
    static acceptPartyInvite() {

    }

    /**
     * Returns a payload object that will be used to send communication to other party members.
     * @param payload The payload to be sent to the party member(s).
     * @return {{PCV: number, payload: string, timestamp: number}}
     */
    static getPartyCommunicationPayload(payload) {
        return {
            PCV: C.PCV,
            // The payload.
            payload: payload,
            // Timestamp of when the payload was created.
            timestamp: new Date().getTime()
        }
    }

    /**
     * Handles party communications from other party members.
     * Sends the specified payload to the specified party member/character.
     * Sends the payload to all party members if the character is not specified.
     * @param payload The payload.
     * @param character The character that should receive the message.
     * @stubbed
     */
    static partyCommunicationHandler(payload, character) {

    }

    /**
     * Sends a communication payload to all party members.
     * @param payload The payload.
     * @stubbed
     */
    static sendPartyCommunication(payload) {

    }

    /**
     * Handles the payload of a broad cast message.
     * @param broadcast The broadcast message.
     */
    static broadcastHandler(broadcast) {
        switch(broadcast.context) {

            case C.COMMS.HUD.INITIALIZED:
                // The HUD has come been initialized.
                // Send the current party settings to the HUD for rendering.
                Communications.broadcast(Communications.getBroadcastObject(C.COMMS.PARTY.INITIALIZED, {
                    leader: this.getPartySetting('leader'), members: this.getPartySetting('members')}, this));
                break;

            case C.COMMS.HUD.PARTY_LEADER_UPDATE:
                // The HUD has a leader update.
                break;

            case C.COMMS.HUD.PARTY_MEMBER_ADDED:
                // The HUD has a party member added.
                break;

            case C.COMMS.HUD.PARTY_MEMBER_REMOVED:
                // the HUD has a party member removed.
                break;
        }
    }



    /**
     * Initializes the party settings in the local storage.
     */
    static initPartyStorage() {
        let key = 'members';
        this.setPartySetting(key, this.getPartySetting(key) === null ? [] : this.getPartySetting(key));

        key = 'leader';
        this.setPartySetting(key, this.getPartySetting(key) === null ? 'Phanku' : this.getPartySetting(key));
    }

    /**
     * Handles a party invite for this character.
     * @param e
     */
    static partyInviteHandler(e) {
        // As per the rules of a party, the party leader should be the only character inviting a member.
        //      - A party leader is defined as:
        //          - The member who starts a party with another character when there is no party.
        //          - A member of the current party who has been elevated to party leader by the party leader leaving.
        //          - A member of the current party is elevated to party leader when they are the first character in the
        //              parent.party_list array.
        //
        // So based on the specified rules the following actions should happen:
        //      - Is this character currently in a party?
        //          - I am not sure if the devs of the game have considered this but still check.
        //              - If yes, do nothing.
        //      - Does this character have local storage that defines a party leader?
        //          - Does the character sending the invite match the current character in local storage?
        //              - If yes, then accept.
        //              - If No, then there must be some sort of validation done to ensure that the character that is
        //                  requesting to party with this character is part of the same swarm of PBot that a user is
        //                  implementing. Otherwise PBot could be tricked into randomly accepting party members for EXP
        //                  leaking.
        //          - The character does have local storage that defines a party leader but the character sending the
        //              invite does not match the local storage. Realistically this could be easily caused by network
        //              traffic issues, or for that matter a bunch of reasons.
        //              - There will be a need to be able to validate the the character requesting the party to ensure
        //                  that this PBot within a swarm ran by a user is not being tricked into accepting a party
        //                  invite for EXP leaking.

        Logger.log(Logger.DEBUG, "Party invite received.");
        console.log(e);
        // Is the character currently in a party?
        if (this.isInParty()) {
            // Yes, do nothing.
            return;
        }
    }

    static cmHandler(e) {
        console.log(e);
        console.log(name);
        console.log(data);
    }

    static bindSocketEvents() {
        Logger.log(Logger.DEBUG, 'Binding to parent socket for invite messages.');
        parent.socket.on('invite', this.partyInviteHandler);
        parent.socket.on('cm', this.cmHandler);
    }

    /**
     * Initializes the party class.
     */
    static init(parent) {

        parent.socket.onevent('cm', )
        window.socket.on('cm', (data)=>{
            console.log(data);
        });

        // Subscribing to the communications object.
        Communications.subscribe((broadcast) => {
            // The broadcastHandler function must be wrapped by a lambda function so as to maintain the
            // reference to this object.
            this.broadcastHandler(broadcast);
        });

        this.initPartyStorage();

        // Binding to the socket events.
        this.bindSocketEvents();

        setInterval(()=>{

        }, 1000);

        // Initializing the observers array.
        Logger.log(Logger.DEBUG, 'Party initialized.');
    }
};
