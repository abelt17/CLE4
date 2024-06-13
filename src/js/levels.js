import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js'
import { Background } from "./background.js";
import { Bridge } from "./bridge.js";
import { Enemy } from "./enemy.js";

export class Level1 extends Scene {

    onInitialize(){
        this.background = new Background(Resources.WindowsHills.toSprite(), 750, 370, 1.1, 1);
        this.add(this.background);
        
        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 1000, 370, 0.3, 0.3, 100, 100, "level1_bridge");
        this.add(this.bridge);

        for(let i = 0; i < 10; i++) {
            this.enemy = new Enemy(Resources.Fish.toSprite(), 100, 100, Resources.Fish.width, Resources.Fish.height);
            this.add(this.enemy);
        }


        this.player = new Player();
        this.add(this.player);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        
        const playerPos = this.player.pos;

        this.camera.pos = playerPos;
    }
    
}

export class Level2 extends Scene {

    onInitialize(){
        this.background = new Background(Resources.WindowsHills.toSprite(), 750, 370, 1.1, 1);
        this.add(this.background);

        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 1000, 370, 0.3, 0.3, 500, 500, "level2_bridge");
        this.add(this.bridge);

        this.player = new Player();
        this.add(this.player);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        
        const playerPos = this.player.pos;

        this.camera.pos = playerPos;
    }
    
}
