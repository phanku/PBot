/**
 * Provides the constants for PBot.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.26.0_025_13cd16b_2020-03-07_12:08:46
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 */
module.exports = {
    // Defines the object types within the game.
    OBJECTS: {
        NPC: 'npc',
        MONSTER: 'monster',
        CHARACTER: 'character'
    },
    // Defines the communications protocols between objects.
    COMMS: {
        STATS: {
            DAMAGE_PER_SECOND: 1.1,
            UPDATE: 1.2
        },
        CHARACTER: {
            POTION_CONSUMPTION: 2.1,
        },
        HUD: {
            INITIALIZED: 3.1,
            SETTING_UPDATE: 3.2,
            PARTY_LEADER_UPDATE: 3.3,
            PARTY_MEMBER_ADDED: 3.4,
            PARTY_MEMBER_REMOVED: 3.5
        },
        PARTY: {
            INITIALIZED: 4.1,
            LEADER_UPDATE: 4.2,
            MEMBER_ADDED: 4.3,
            MEMBER_REMOVED: 4.4,
            MEMBER_DISCONNECT: 4.5,
            MEMBER_CONNECT: 4.6,
            PARTY_COMMAND: 4.7,
        },
        GAME: {
            BOT_VERSION: 5.1
        }
    },
    // Defines the communication protocols between characters.
    PARTY: {
        LEADER_UPDATE: 1,
        MEMBER_ADDED: 1,
        MEMBER_REMOVED: 2,
        MEMBER_DISCONNECT: 3,
        MEMBER_CONNECT: 4,
        MEMBER_REQUEST: 5,
        MEMBER_COMMAND: 6,
        PARTY_COMMAND: 7,
    },
    // Defines the signature private key to be used within a PBot swarm.
    PARTY_SIGNATURE: 'N%z!RN4B8C2C}v6',
    // Defines the characters the party module with consider for a party.
    PARTY_ALLOWED_CHARACTERS: [
        'Phanku',
        'YToo',
        'YKnot'
    ],
    PCV: 1,
    // Defines the type of points for the character.
    POINTS: {
        HP: 1,
        MP: 2,
    },
    // Defines all of the potion information.
    POTION: {
        HP: {
            NAME: 'HP',
            SIZE: {
                LARGE: {
                    INV_NAME: 'hpot1',
                    RESTORE_AMOUNT: 500,
                },
                SMALL: {
                    INV_NAME: 'hpot0',
                    RESTORE_AMOUNT: 300,
                }
            },
        },
        MP: {
            NAME: 'MP',
            SIZE: {
                LARGE: {
                    INV_NAME: 'mpot1',
                    RESTORE_AMOUNT: 500,
                },
                SMALL: {
                    INV_NAME: 'mpot0',
                    RESTORE_AMOUNT: 300,
                }
            }
        }
    },
    // Defines the character types in the game.
    CHARACTER_TYPE: {
        MAGE: 1,
        WARRIOR: 2,
        PRIEST: 3,
        ROGUE: 4,
        RANGER: 5,
        MERCHANT: 6
    },
    // Defines the human readable character class in the game.
    CHARACTER_CLASS: {
        MAGE: "mage",
        WARRIOR: "warrior",
        PRIEST: "priest",
        ROGUE: "rogue",
        RANGER: "ranger",
        MERCHANT: "merchant"
    },
    // Defines the actions within the game.
    GAME_ACTION: {
        ACTION: "action",
        DEATH: "death",
        LEVEL_UP: "level_up",
        LOOT: "loot",
        TARGET_HIT: "target_hit"
    },
    GAME_ACTION_TYPE: {
        ATTACK: "attack"
    },
    // Defines the constants for the stats module.
    STATS: {
        UPDATE_INTERVAL: 30,
        TYPE: {
            DAMAGE: 0,
            GOLD: 1,
            XP: 3
        },
        TIMEOUT: {
            DAMAGE: 30,
            GOLD: 60,
            XP: 60
        }
    }
};






