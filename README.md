# PBot - An AdventureLand bot.
###### DV: @version 0.27.0_028_85a83f5_2020-03-08_20:02:42
## Author: [Joseph Pahl]
## Version: @tag 0.29.0

[Changelog](CHANGELOG.md)
    
## Repository: https://github.com/phanku/PBot

## Description
 
[AdventureLand] is a MMORPG game in which you write JavaScript, also known as `CODE`, that controls your character(s).

[PBot] is my personal [AdventureLand] bot that is currently being developed for playing the game. 

I personally find [AdventureLand] fun as I grew up playing Multi User Dungeons (MUD) back in the day. MUDs are a text 
base role playing game. Scripting for [AdventureLand] reminds me of those days of playing on 
a MUD called [Three Kingdoms].

AdventureLand website: [https://adventure.land/](https://adventure.land/)

------------------------------------------------------------
IDE
------------------------------------------------------------

I am a professional developer with over 10 years of experience in creating web based applications. As such I do love
and have a tendency to use professional IDEs. I used PHPStorm to create this project and have no intentions to ever 
stop. With that said, I also do not plan to assist anyone in using this bot if I ever make it public. PBot comes
as it is and I do not promise anything other than here is the bot that is being developed to play the AdventureLand game.  

I use the file watchers within PHPStorm to automatically execute webpack to compile the various files together into
one file. 

------------------------------------------------------------
How to get started
------------------------------------------------------------

As stated below, this project uses [Webpack] to compile the project into one file for use within [AdventureLand].
It is highly recommended to use a professional IDE while contributing/working with this project. 

Requirements:
    - NodeJS must be installed and functioning on the machine used to compile this project.
    - A Node based package manager must be installed and working on the machine to compile this project. 

1) Clone the this repository on to a local machine. 
2) Open a terminal to the root of the project. 
3) Type `npm install` or `yarn install` to install the needed development dependencies.
4) Execute webpack. 
5) Copy the generated `Pbot.js` file located in the `dist` folder into your clipboard.
6) Paste the code into your `CODE` section of AdventureLand.

------------------------------------------------------------
Auto Version for files
------------------------------------------------------------

The version, and since, identifiers within the file documentation blocks as well as the verison identifier for this
readme are all done automatically using a hook within the [Git] system. 

The versions of files within this application was done by the `pre-commit` script that is located
in the `.githooks` folder. 

Note: The GIT based auto version system only works on the following file types: 

    - PHP   :   *.php
    - CSS   :   *.css
    - SCSS  :   *.scss
    - JS    :   *.js
    - MD    :   *.md
    - HBS   :   *.hbs

To activate the auto versioning:
 1) Clone this repo.
 2) Type the following command in the command line while being within the local repository folder:
 
 `git _config core.hooksPath ./githooks`
  
 NOTE: You will have to execute the `git commit` commands via the terminal using [PhpStorm] due to an un-known bug
 in the `pre-commit` file for `git`. All other version control system (VCS) options within [PhpStorm] will still work
 as intended. 

The master branch of the repository should only hold working versions of PBot. 

Instructions for pushing a new version to repository: 
1) Make the changes to the scripts as needed. 
2) Type `git tag -a -m "<Version note>" <version number>`
3) Type `git add .`
4) Type `git commit -m "<commit message>"`
5) Type `git push --follow-tags`
 
------------------------------------------------------------
Webpack 
------------------------------------------------------------ 
    
The [Yarn Package Manager] (Yarn) is used to manage the JavaScript packages, that are contained within the [NPM] repo, 
used within PBot. It is recommended that [Yarn Package Manager] is used however there is a possibility that [NPM] 
could also be used.
 
The front end packages are found under the `node_modules` directory but the actual `package.json` file 
is located in the root folder. 

- Requirements: 
    - [NodeJs]
    - [NPM]
    - [Yarn Package Manager]
    
This section describes on how to add, remove, or update the packages within the `node_modules` folder.
All of the instructions below are executed on a terminal/command line. 

- Update: 
    
    - In the root folder type: 
        - NPM: `npm update`,
        - Yarn: `yarn install`
    
- Add/install:

    - In the root folder type: 
        - NPM: `npm install <package name>`
        - Yarn: `yarn add <package name> --dev` or `yarn add <package name>`
    
- Remove/uninstall

    - In the root folder type: 
        - NPM: `npm uninstall <package name`
        - Yarn: `yarn add <package name> --dev` or `yarn add <package name>`
 
------------------------------------------------------------
##### PhpStorm File watchers
------------------------------------------------------------

It is highly recommended that to use [PhpStorm]'s file watchers while developing PBot.

Three file watchers will need to be set up

- SCSS : Watches for changes to [SASS] files.
- JS : Watches for changes to `JavaScript` files.
- HBS : Watches for changes to `hbs` files.
    
The file watcher settings below are for setting up [Webpack] to automatically fire `yarn run build` when a file type
listed above changes. Using [PhpStorm]'s file watcher, [Webpack], and [PhpStorm]'s auto deployment combined delivers a
decent development environment. 

1. Open the settings dialog in [PhpStorm]. 
2. Find and unfold the `Tools` settings in the left side of the dialog window.
3. Click on `File Watchers` settings in the left side of the dialog window.
4. Three `File Watchers` need to be set up, one each for `js`, `hbs`, and `scss`.
    1. Click on the `+` button on the right side of the dialog window. This will create a new `File watcher`.
    2. Select `<custom>` option from the context menu that displays. 
    3. Name the `File Watcher` so that represents one of the three types above.
    4. Select either `JavaScript`, `SCSS Style Sheet`, or `HTML` depending on which `File Watcher` you are establishing.
    5. Select the `/src/` folder and then click the `Include Recursively` button. The `Pattern` field should appear.
    6. Click `OK`.
    7. Set the `Program` in the `Edit Watcher` dialog window to `yarn`.
    8. Set the `Arguments` to `run build` in the `Edit Watcher` dialog window. 
    9. Set the `Output paths to refresh` to `$ProjectFileDir$`. 
        1. Note: `$ProjectFileDir$` is a [PhpStorm] macro.
    10. Set the `Working Directory` to `$ProjectFileDir$\assets`. 
    11. Click `Ok`.
5. Repeat the steps above once for `js`, `hbs`, and `scss`. 

[//]: # (These are reference links used in the body of this note.)
     
   [Joseph Pahl]: <https://github.com/phanku/>   
   [NodeJs]: <https://nodejs.org/en/>
   [Node Package Manager]: <https://www.npmjs.com/>
   [NPM]: <https://www.npmjs.com/>
   [Yarn Package Manager]: <https://yarnpkg.com/en/>
   [PhpStorm]: <https://www.jetbrains.com/phpstorm/>
   [SASS]: <https://sass-lang.com/>
   [Webpack]: <https://webpack.js.org/>
   [Underscore]: <https://underscorejs.org/>   
   [Git]: <https://git-scm.com/>  
   [PBot]: <https://github.com/phanku/PBot>
   [Three Kingdoms]: <http://3k.org/>
   [AdventureLand]: <https://store.steampowered.com/app/777150/Adventure_Land__The_Code_MMORPG/>
