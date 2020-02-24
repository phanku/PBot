/**
 * Provides the constants for PBot.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.22.0_001_d08612d_2020-02-24_09:01:52
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
            SETTING_UPDATE: 3.1,
        },
        GAME: {
            BOT_VERSION: 4.1
        }
    },
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
    }
};






