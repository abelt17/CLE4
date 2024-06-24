import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { MainMenuScene } from './mainMenu.js';
import { IntroScene } from './introScene.js';
import { EnemyFight, Level1, Level2, Level3, VillaBaobab } from './levels.js';
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
        this.defeatedBosses = {}; // Track defeated bosses
        this.backgroundColor = Color.Black;
        this.selectedPlayer = 'player1';
        this.start(ResourceLoader).then(() => this.startGame())
    }

    async startGame() {
        this.add('playerInfo', new PlayerInfo());
        this.add('mainmenu', new MainMenuScene());
        this.add('intro', new IntroScene());
        this.add('selectScene', new SelectScene());
        this.add('deathScreen', new DeathScreen());
        this.add('enemyFight', new EnemyFight());
        this.add('villaBaobab', new VillaBaobab());
        this.add('level1', new Level1());
        this.add('level2', new Level2());
        this.add('level3', new Level3())


        this.goToScene('mainmenu');
    }
}

new Game();