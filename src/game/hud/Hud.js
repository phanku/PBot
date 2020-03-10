/**
 * Provides the PBot HUD.
 * @author Joseph Pahl <https://github.com/phanku/>
 * @version 0.27.0_032_c75b903_2020-03-10_16:26:52
 * @since 0.22.0_001_d08612d_2020-02-24_08:53:57
 * @todo Move any settings that could be considered semi-permanent into the storage module/local storage.
 */

// Imports
import { C } from "../Constants";
import Logger from "../logger/Logger";
import Storage from "../Storage";
import Communications from "../Communications";

/**
 * Provides the methods and HUD interface.
 */
export default class Hud {

    /**
     * Loads the templates into this object.
     */
    static loadTemplates() {
        this._templates = {
            main: require('./main/main.hbs')
        };

        Logger.log(Logger.DEBUG, 'Hud Templates loaded.');
    }

    /**
     * Determines if the HUD has been added to the DOM.
     * @return {boolean}
     */
    static isHudPresent() {
        let present = parent.$('#pbot-hud').length > 0;
        Logger.log(Logger.DEBUG, 'Hud Present: ' + (present));
        return present;
    }

    /**
     * Builds and injects the hud into the DOM.
     */
    static buildHud() {
        parent.$('body').append(this._templates.main());
        parent.$('head').append($('<style></style>').text(require('./main/main.scss')));
        Logger.log(Logger.DEBUG, 'Hud built.');
    }

    /**
     * Fetches and stores references to the HUD's elements.
     */
    static fetchHudReferences() {
        this._R.hud = parent.$('#pbot-hud');
        this._R.hudTabs = parent.$('#pbot-hud-tabs');
        this._R.hudTabButtons = parent.$('#pbot-hud-tabs .tab-button');
        this._R.hudTabContents = parent.$('#pbot-hud-tabs .tab-content');
        this._R.autoAttack = parent.$('#auto-attack');
        this._R.closestTarget = parent.$('#closest-target');
        this._R.potionCountHP = parent.$('#hp-number');
        this._R.potionCountMP = parent.$('#mp-number');
        this._R.damagePerSecond = parent.$('#dps-number');
        this._R.XPPerSecond = parent.$('#xpps-number');
        this._R.goldPerSecond = parent.$('#gps-number');
        this._R.gold = parent.$('#gold-number');
        this._R.eta2l = parent.$('#eta2l-time');
        this._R.maxAtt = parent.$('#max-att');
        this._R.hpPotionTrigger = parent.$('#hp-potion-trigger');
        this._R.mpPotionTrigger = parent.$('#mp-potion-trigger');
        this._R.hudMinimizeButton = parent.$('#pbot-minimize');
        this._R.hudContentContainer = parent.$('#pbot-hud-content');
        this._R.hudGraphDps = parent.document.getElementById('pbot-graph-dps');
        this._R.hudGraphGps = parent.document.getElementById('pbot-graph-gps');
        this._R.hudGraphXPps = parent.document.getElementById('pbot-graph-xpps');
        Logger.log(Logger.DEBUG, 'Hud elements references stored.');
        // this.setEventListeners();
    }

    /**
     * Sets the bot version in the hud title.
     * @param version
     */
    static setBotVersion(version) {
        parent.$('#pbot-bot-version').text(version);
        Logger.log(Logger.DEBUG, 'Bot version added to hud.');
    }

    /**
     * Returns an integer based on if stat1 is larger than, less than, or equal to stat2.
     * @param stat1 The first stat.
     * @param stat2 The second stat.
     * @returns {number}
     */
    static compare(stat1, stat2) {
        return (stat1 > stat2 ? 1 : stat1 < stat2 ? -1 : 0);
    }

    /**
     * Causes the HUD to be draggable by using the jQuery UI already installed in the game.
     */
    static initHudDragging() {
        let hudLocation = this.getHudSetting('location');
        this._R.hud.css('left', hudLocation.left).css('top', hudLocation.top);
        this._R.hud.draggable({
            stop: (e, ui) => {
                Hud.setHudSetting('location', {
                    top: ui.position.top,
                    left: ui.position.left
                })
            },
        });
        Logger.log(Logger.DEBUG, 'Hud dragging initialized.');
    }

    /**
     * Activates the behavior for the tabs within the HUD.
     */
    static initHudTabs() {
        // Loading the HUD tab settings from local storage.
        let hudActiveTab = this.getHudSetting('activeTab');
        // Setting the current active tabs according to the storage module.
        this._R.hudTabButtons.find('[data-tab="' + hudActiveTab + '"]').addClass('active');
        this._R.hudTabButtons.find('#' + hudActiveTab).addClass('active');

        // Activating the event bindings.
        this._R.hudTabButtons.on('click', (e) => {

            // Saving the tab choice to local storage.
            this.setHudSetting('activeTab', window.parent.$(e.currentTarget).data('tab'));

            this._R.hudTabContents.each((i,v) => {
                window.parent.$(v).removeClass('active');
            });

            this._R.hudTabButtons.removeClass('active');
            window.parent.$(e.currentTarget).addClass('active');
            window.parent.$('#pbot-hud-tabs #' + window.parent.$(e.currentTarget).data('tab')).addClass('active');
        });

        Logger.log(Logger.DEBUG, 'Hud tabs initialized.');
    }

    /**
     * Activates the Pretty check boxes in the hud.
     */
    static initHudChecks() {
        this._R.autoAttack.on('change', (e) => {
            Communications.broadcast(
                Communications.getBroadcastObject(C.COMMS.HUD.SETTING_UPDATE, this.getCharacterConfigs(), this));
        });

        Logger.log(Logger.DEBUG, 'Hud pretty checks initialized.');
    }

    /**
     * Activates the blur event in the hud that will cause the potion consumption points to be updated.
     */
    static initTriggerPoints() {
        this._R.mpPotionTrigger.add(this._R.hpPotionTrigger).on('blur', (e) => {
            Communications.broadcast(
                Communications.getBroadcastObject(C.COMMS.HUD.SETTING_UPDATE, this.getCharacterConfigs(), this));
        });
    }

    /**
     * Returns an object that contains the settings in the HUD.
     */
    static getCharacterConfigs() {
        // Collect and return the Hud configurations.
        return {
            attackActive: this._R.autoAttack.prop('checked'),
            closestTarget: this._R.closestTarget.prop('checked'),
            maxAtt: this._R.maxAtt.val(),
            hpPotionTrigger: this._R.hpPotionTrigger.val(),
            mpPotionTrigger: this._R.mpPotionTrigger.val(),
        };
    }

    /**
     * Stores reference to the character object in this class.
     * @param character
     */
    static setCharacter(character) {
        this._character = character;
        Logger.log(Logger.DEBUG, 'Character reference stored.');
    }

    /**
     * Saves the HUD setting to the local storage.
     * @param key
     * @param value
     */
    static setHudSetting(key, value) {
        Storage.set('hud_' + key, value);
    }

    /**
     * Fetches the HUD setting from the local storage.
     * @param key
     * @param value
     * @return {*}
     */
    static getHudSetting(key, value) {
        return Storage.get('hud_' + key);
    }

    /**
     * Initializes the HUD settings in local storage.
     */
    static initHudSettings() {
        if (this.getHudSetting('init')) {
            return;
        }

        this.setHudSetting('activeTab', 'pbot-hud-stats');
        this.setHudSetting('location', {top: 160, left: 0});
        this.setHudSetting('minimized', false);
        this.setHudSetting('init', true);
        Logger.log(Logger.DEBUG, "Hud settings initialized.");
    }

    /**
     * Initializes the HUD minimization feature.
     */
    static initHudMinimize() {
        this._R.hudMinimizeButton.on('click', (e)=>{
            if (this._R.hudContentContainer.hasClass('folded')) {
                this.setHudSetting('minimized', false);
                this._R.hudContentContainer.removeClass('folded');
            } else {
                this.setHudSetting('minimized', true);
                this._R.hudContentContainer.addClass('folded');
            }
        });

        // Loading the last saved HUD minimized settings.
        if (this.getHudSetting('minimized')) {
            this._R.hudContentContainer.addClass('folded');
        }

        Logger.log(Logger.DEBUG, "Hud minimization initialized.");
    }

    /**
     * Updates the potions section of the HUD stats.
     * @param potions An object containing the character's current potion levels.
     */
    static updatePotions(potions) {
        this._R.potionCountHP.text(potions.HP);
        this._R.potionCountMP.text(potions.MP);
    }

    /**
     * Updates the DPS on the Hud.
     * @param stats An object with the stats.
     */
    static updateDPSStat(stats) {
        this._R.damagePerSecond.html(stats.dps);
        this._top.dps = stats.dps > this._top.dps ? stats.dps : this._top.dps;
        this._graphDps.data.datasets[0].data = [this._top.dps];
        this._graphDps.data.datasets[1].data = [stats.dps];
        this._graphDps.update();
    }

    /**
     * Causes the HUD to update the per second stats.
     * @param stats An object containing the stats.
     */
    static updateHudStats(stats) {
        this.updateDPSStat(stats);
        this._R.XPPerSecond.html(stats.xpps);
        this._R.goldPerSecond.html(stats.gps);
        this._R.gold.html(stats.gold);
        this._R.eta2l.html(stats.eta2l);
        this._top.gps = stats.gps > this._top.gps ? stats.gps : this._top.gps;
        this._top.xpps = stats.xpps > this._top.xpps ? stats.xpps : this._top.xpps;

        this._graphGps.data.datasets[0].data = [this._top.gps];
        this._graphGps.data.datasets[1].data = [stats.gps];
        this._graphGps.update();

        this._graphXPps.data.datasets[0].data = [this._top.xpps];
        this._graphXPps.data.datasets[1].data = [stats.xpps];
        this._graphXPps.update();

        this._last = stats;
    }

    /**
     * Handles the payload of a broad cast message.
     * @param broadcast The broadcast message.
     */
    static broadcastHandler(broadcast) {
        switch(broadcast.context) {
            case C.COMMS.PARTY.INITIALIZED:
                // The party module has acknowledged the HUD being ready.
                // The party module should have sent the current party leader and members here.
                break;

            case C.COMMS.STATS.DAMAGE_PER_SECOND:
                // The stats module has issued an updated DPS number.
                this.updateDPSStat(broadcast.payload);
                break;

            case C.COMMS.CHARACTER.POTION_CONSUMPTION:
                // The character class has issued an character consuming a potion broadcast.
                this.updatePotions(broadcast.payload);
                break;

            case C.COMMS.STATS.UPDATE:
                // The stats module has issued a stats numbers updated broadcast.
                this.updateHudStats(broadcast.payload);
                break;

            case C.COMMS.GAME.BOT_VERSION:
                // PBot version.
                this.setBotVersion(broadcast.payload.version);
                break;
        }
    }

    /**
     * Initializes the canvas graphs.
     * @todo Rename this method to follow naming conventions.
     */
    static startGraph() {
        // The options for the graphics in the HUD.
        let graphOptions = {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                // xAxes: [{
                //     categoryPercentage: 1,
                //     barPercentage: 0.4
                // }],
                yAxes: [{
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.4)'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        this._graphDps = new Chart(this._R.hudGraphDps, {
            type: 'bar',
            data: {
                labels: ['DPS'],
                categoryPercentage: 1,
                datasets: [
                    {
                        data: [0],
                        backgroundColor: 'rgba(255,204,204,1)',
                        barPercentage: 0.4
                    },
                    {
                        data: [0],
                        backgroundColor: 'rgba(204,204,255,1)',
                        barPercentage: 0.4
                    }
                ],
            },
            options: graphOptions
        });

        this._graphGps = new Chart(this._R.hudGraphGps, {
            type: 'bar',
            data: {
                labels: ['GPS'],
                categoryPercentage: 1,
                datasets: [
                    {
                        data: [0],
                        backgroundColor: 'rgba(255,204,204,1)',
                        barPercentage: 0.4
                    },
                    {
                        data: [0],
                        backgroundColor: 'rgba(204,204,255,1)',
                        barPercentage: 0.4
                    }
                ]
            },
            options: graphOptions
        });

        this._graphXPps = new Chart(this._R.hudGraphXPps, {
            type: 'bar',
            data: {
                labels: ['XPPS'],
                categoryPercentage: 1,
                datasets: [
                    {
                        data: [0],
                        backgroundColor: 'rgba(255,204,204,1)',
                        barPercentage: 0.4
                    },
                    {
                        data: [0],
                        backgroundColor: 'rgba(204,204,255,1)',
                        barPercentage: 0.4
                    }
                ]
            },
            options: graphOptions
        });
    }

    /**
     * Initializes the hud.
     */
    static init() {
        // Initialize the references object.
        this._R = {};
        // Store the last stats so the HUD can show differences.
        this._last = {};
        // Store the last
        this._top = {
            dps: 0,
            gps: 0,
            xpps: 0,
        };

        // Load the HUD templates.
        this.loadTemplates();
        // Initialize the HUD settings in the local storage.
        this.initHudSettings();

        // Subscribing to the  object.
        Communications.subscribe((broadcast) => {
            // The broadcastHandler function must be wrapped by a lambda function so as to maintain the
            // reference to this object.
            this.broadcastHandler(broadcast);
        });

        // Checking to see if the HUD is already in the DOM.
        if (!this.isHudPresent()) {
            // The HUD is not in the DOM so now build and inject.
            parent.$.when(
                this.buildHud()
            ).then(()=>{
                parent.$.when(
                    // Fetch references to the sections in the HUD that need to be updated.
                    this.fetchHudReferences()
                ).then(()=>{
                    // Make the hud draggable.
                    this.initHudDragging();
                    // Activate the HUD tabs.
                    this.initHudTabs();
                    this.initHudChecks();
                    this.initTriggerPoints();
                    this.initHudMinimize();
                    setTimeout(()=>{
                        this.startGraph();

                        // Notify any modules waiting for the HUD to come online.
                        Communications.broadcast(
                            Communications.getBroadcastObject(C.COMMS.HUD.INITIALIZED, {}, this));

                    }, 500);
                });

                // this.relocateHud();
            });
        } else {
            // The HUD already exists in the DOM.
            // Fetch references to the sections in the HUD that need to be updated.
            this.fetchHudReferences();
        }

        Logger.log(Logger.DEBUG, 'HUD initialized.');
    }
};

Hud.init();