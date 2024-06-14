import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer, Keys } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player, StaticPlayer, PlayerData } from './player.js'
import { Background } from "./background.js";
import { Bridge } from "./bridge.js";
import { Enemy, StaticEnemy } from "./enemy.js";

export class EnemyFight extends Scene {

    updateEnemy(identifier) {
        this.remove(this.enemy, this.player);

        this.player = new StaticPlayer(400, 600);
        this.add(this.player);


        if (identifier === "fish") {
            this.enemy = new StaticEnemy(Resources.Fish.toSprite(), 1000, 300, "fish");
        } else if (identifier === "spider") {
            this.enemy = new StaticEnemy(Resources.Spider.toSprite(), 1000, 300, "spider");
        }

        this.add(this.enemy);
    }

    update(engine, delta) {
        super.update(engine, delta);

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            this.enemy.health -= 50;
            console.log(this.enemy.health)
            if (this.enemy.health <= 0) {
                this.onEnemyDefeated();
            }
        }
    }

    onEnemyDefeated() {
        PlayerData.xp += 10;
        this.engine.goToScene('level1');
        this.engine.defeatedEnemy = this.engine.currentEnemy; // Track the defeated enemy

        console.log(PlayerData.xp);
    }

}

export class Level1 extends Scene {
    onInitialize() {

        this.background = new Background(Resources.WindowsHills.toSprite(), 750, 370, 1.1, 1);
        this.add(this.background);

        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 1000, 370, 0.3, 0.3, 500, 500, "level1_bridge");
        this.add(this.bridge);

        this.spawnEnemies();

        this.player = new Player(400, 400);
        this.add(this.player);
    }

    spawnEnemies() {
        for (let i = 0; i < 10; i++) {
            this.enemy = new Enemy(Resources.Fish.toSprite(), 100 + i * 50, 100, Resources.Fish.width, Resources.Fish.height, "fish");
            this.add(this.enemy);
        }

        this.spider = new Enemy(Resources.Spider.toSprite(), 200, 100, Resources.Spider.width, Resources.Spider.height, "spider");
        this.add(this.spider);
    }


    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const playerPos = this.player.pos;

        this.camera.pos = playerPos;
        // Remove defeated enemy
        if (engine.defeatedEnemy) {
            this.remove(engine.defeatedEnemy);
            engine.defeatedEnemy = null; // Reset after removal
        }

    }

}

export class Level2 extends Scene {

    onInitialize() {
        this.background = new Background(Resources.WindowsHills.toSprite(), 750, 370, 1.1, 1);
        this.add(this.background);

        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 1000, 370, 0.3, 0.3, 500, 500, "level2_bridge");
        this.add(this.bridge);

        this.player = new Player(400, 400);
        this.add(this.player);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const playerPos = this.player.pos;

        this.camera.pos = playerPos;
    }

}
