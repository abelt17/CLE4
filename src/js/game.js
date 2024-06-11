import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { MainMenuScene } from './mainMenu.js';
import { Level1 } from './level1.js';
import { Level2 } from './level2.js';


export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    async startGame() {

        this.add('mainmenu', new MainMenuScene());
        this.add('level', new Level1());
        this.add('level', new Level2());

        this.goToScene('mainmenu');
    }
}

new Game();