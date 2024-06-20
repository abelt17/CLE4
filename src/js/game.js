import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { MainMenuScene } from './mainMenu.js';
import { IntroScene } from './introScene.js';
import { EnemyFight, Level1, Level2 } from './levels.js';
import { DeathScreen } from './deathScreen.js';
import { SelectScene } from './selectScreen.js';
import { PlayerInfo } from './playerInfo.js';



export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.selectedCritter = 'critter1';
        this.start(ResourceLoader).then(() => this.startGame())
    }

    async startGame() {
        this.add('playerInfo', new PlayerInfo());
        this.add('mainmenu', new MainMenuScene());
        this.add('intro', new IntroScene());
        this.add('deathScreen', new DeathScreen());
        this.add('enemyFight', new EnemyFight());
        this.add('selectScene', new SelectScene());
        this.add('level1', new Level1());
        this.add('level2', new Level2());


        this.goToScene('mainmenu');
    }
}

new Game();