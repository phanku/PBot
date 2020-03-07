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
const sha256 = require('sha256/lib/sha256');

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
     * Sets the party's code message signature private key in local storage.
     * @param key The key.
     */
    static setPartyKey(key) {
        Storage.setGlobal('party_signature', key);
    }

    /**
     * Returns the party's code message signature private key from local storage.
     * @returns {*}
     */
    static getPartyKey() {
        return Storage.getGlobal('party_signature');
    }

    /**
     * Returns true if, and only if, the specified character is part of the current party.
     * @param name The name of the character.
     * @returns {boolean}
     */
    static isAPartyMember(name) {
        return parent.party_list.filter(word => name === word).length > 0;
    }

    /**
     * Returns true, if and only if, the character is in a party.
     */
    static isInParty() {
        return this.isAPartyMember(character.name);
    }

    /**
     * Returns true if, and only if, the specified character is the current party leader.
     * @param name The name of the character.
     */
    static characterIsPartyLeader(name) {
        return parent.party_list.length > 0 ? parent.party_list[0] === name : false;
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
     * Returns the list of party members from the local storage.
     * @return {array}
     */
    static readPartyMembers() {
        return this.getPartySetting('members');
    }

    /**
     * Saves the list of party members into local storage.
     * @param members The members
     */
    static savePartyMembers(members) {
        this.setPartySetting('members', members);
    }

    /**
     * Returns true if, and only if, the specified character is the current character.
     * @param name The character.
     * @returns {boolean}
     */
    static isThisCharacter(name) {
        return name === character.name;
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
    static acceptPartyInvite(name) {
        accept_party_invite(name);
        this.savePartyMembers(parent.party_list);
    }

    /**
     * Returns a payload object that will be used to send communication to other party members.
     * @param payload The payload to be sent to the party member(s).
     * @returns {{payload: *, key}}
     */
    static getPartyCommunicationPayload(payload) {
        let out = {
            // The payload.
            payload: payload
        };

        out.signature = sha256([payload, this.getPartyKey()]);
        return out;
    }

    /**
     * Returns true if, and only if, the specified payload has a valid signature.
     * @param payload The payload.
     * @returns {boolean}
     */
    static hasValidSignature(payload) {
        let signature = payload.signature;
        delete payload.signature;
        return sha256([payload, this.getPartyKey()]) === signature;
    }

    /**
     * Handles party communications from other party members.
     * Sends the specified payload to the specified party member/character.
     * Sends the payload to all party members if the character is not specified.
     * @param payload The payload.
     * @param character The character that should receive the message.
     * @stubbed
     */
    static partyMessageHandler(from, payload) {

    }

    /**
     * Sends a communication payload to a party member.
     * @param payload The payload.
     * @stubbed
     */
    static sendPartyMemberMessage(to, payload) {
    }

    /**
     * Sends a communication payload to all party members.
     * @param payload
     */
    static sendPartyMessage(payload) {

    }

    /**
     * Handles party communications from other party members.
     * @param from The name of the character that sent the message.
     * @param payload The payload.
     */
    static codeMessageHandler(from, payload) {
        // Have to determine certain things before blindly sending this over to the party message handler.
        // 1) Is the signature for the payload actually correct?
        // 2) Is the code message actually a party related message?

        // Checking the signature of the message.
        // Log a warning and then ignore if the signature is not correct.
        if (!this.hasValidSignature(payload))
        {
            Logger.log(Logger.WARN, 'Invalid signature on CM from: ' + from);
            // Nothing to do.
            return;
        }

        // Add check for party related message.

        // The person the CM is from is part of the current party.
        // Process the payload.
        this.partyMessageHandler(from, payload);
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
        Logger.log(Logger.DEBUG, 'Initializing party local storage.');
        let key = 'members';
        this.setPartySetting(key, this.getPartySetting(key) === null ? [] : this.getPartySetting(key));
        if (this.getPartyKey() === null) {
            this.setPartyKey(Math.random().toString(36).slice(-16));
            Logger.log(Logger.DEBUG, "Generated party key. Key: " + this.getPartyKey());
            return;
        }

        Logger.log(Logger.DEBUG, "Party key found. Key: " + this.getPartyKey());
    }

    /**
     * Handles a party invite for this character.
     * @param invite The invite.
     * @todo Continue to flush out logic for this method.
     */
    static partyInviteHandler(invite) {
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

        // Is the character currently in a party?
        if (Party.isInParty()) {
            // Yes, do nothing.
            return;
        }

        Party.acceptPartyInvite(invite.name);
    }

    /**
     * Creates the event listeners needed for the party module.
     */
    static bindEvents() {
        Logger.log(Logger.DEBUG, 'Binding to parent socket for invites and party messages.');
        parent.socket.on('invite', this.partyInviteHandler);
        window.on_cm = this.codeMessageHandler;
    }

    /**
     * Initializes the party class.
     */
    static init() {
        // Subscribing to the communications object.
        Communications.subscribe((broadcast) => {
            // The broadcastHandler function must be wrapped by a lambda function so as to maintain the
            // reference to this object.
            this.broadcastHandler(broadcast);
        });

        this.initPartyStorage();
        // Binding to the socket events.
        this.bindEvents();
        // Initializing the observers array.
        Logger.log(Logger.DEBUG, 'Party initialized.');
    }
};

Party.init();