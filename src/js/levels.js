import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js'
import { Background } from "./background.js";
import { Bridge } from "./bridge.js";
import { Enemy, StaticEnemy } from "./enemy.js";

export class EnemyFight extends Scene {

    updateEnemy(identifier) {
        this.remove(this.enemy);
        
        if (identifier === "fish") {
            this.enemy = new StaticEnemy(Resources.Fish.toSprite(), 500, 500);
        } else if (identifier === "spider") {
            this.enemy = new StaticEnemy(Resources.Spider.toSprite(), 500, 500);
        }
        
        this.add(this.enemy);
    }

}

export class Level1 extends Scene {

    onInitialize(){
        this.background = new Background(Resources.WindowsHills.toSprite(), 750, 370, 1.1, 1);
        this.add(this.background);
        
        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 1000, 370, 0.3, 0.3, 500, 500, "level1_bridge");
        this.add(this.bridge);

        for(let i = 0; i < 10; i++) {
            this.enemy = new Enemy(Resources.Fish.toSprite(), 100, 100, Resources.Fish.width, Resources.Fish.height, "fish");
            this.add(this.enemy);
        }

        this.spider = new Enemy(Resources.Spider.toSprite(), 200, 100, Resources.Spider.width, Resources.Spider.height, "spider");
        this.add(this.spider);

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
