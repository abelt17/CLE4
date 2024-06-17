import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer, Keys } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player, StaticPlayer, PlayerData, Cursor } from './player.js'
import { Background } from "./background.js";
import { Bridge } from "./bridge.js";
import { Enemy, StaticEnemy } from "./enemy.js";
import { Attacks } from "./fightOverlay.js";
import { eventEmitter } from './eventEmitter.js';


export class EnemyFight extends Scene {
    constructor() {
        super();
        // Other initialization code
        eventEmitter.on('attackHit', (data) => {
            this.handleAttackHit(data.identifier);
        });
    }

    updateEnemy(identifier) {
        this.remove(this.cursor);
        this.remove(this.enemy);
        this.remove(this.player);
        this.remove(this.attack1);
        this.remove(this.attack2);

        this.player = new StaticPlayer(400, 600);
        this.add(this.player);

        if (identifier === "fish") {
            this.enemy = new StaticEnemy(Resources.Fish.toSprite(), 1000, 300, "fish");
        } else if (identifier === "spider") {
            this.enemy = new StaticEnemy(Resources.Spider.toSprite(), 1000, 300, "spider");
        }
        this.add(this.enemy);
        
        this.attack1 = new Attacks(200, 200, "attack1");
        this.attack2 = new Attacks(500, 200, "attack2");
        this.add(this.attack1);
        this.add(this.attack2);

        this.cursor = new Cursor(640, 360);
        this.add(this.cursor);

    }

    handleAttackHit(identifier) {
        switch (identifier) {
            case "attack1":
                // Example: Decrease health for attack1
                if (this.enemy && this.enemy.identifier === "fish") {
                    this.enemy.health -= Math.floor(Math.random() * 5) + 15;
                } else if (this.enemy && this.enemy.identifier === "spider") {
                    this.enemy.health -= Math.floor(Math.random() * 5) + 15;
                }
                break;
            case "attack2":
                // Example: Decrease health for attack2
                if (this.enemy && this.enemy.identifier === "fish") {
                    this.enemy.health -= Math.floor(Math.random() * 40) + 2;
                } else if (this.enemy && this.enemy.identifier === "spider") {
                    this.enemy.health -= Math.floor(Math.random() * 40) + 2;
                }
                break;
            default:
                break;
        }

        console.log(`Enemy health: ${this.enemy.health}`);

        if (this.enemy && this.enemy.health <= 0) {
            this.onEnemyDefeated();
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

        if (this.engine.enemyState === undefined) {
            this.engine.enemyState = false;
        }

        this.background = new Background(Resources.Zone1.toSprite(), 750, 370, 1.5, 1.5);
        this.add(this.background);

        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 1400, 370, 0.3, 0.3, 500, 500, "level1_bridge");
        this.add(this.bridge);

        this.spawnEnemies();

        this.player = new Player(400, 400);
        this.add(this.player);
    }

    onActivate() {
        if(this.engine.enemyState) {
            this.removeEnemies();
            this.spawnEnemies();
            this.engine.enemyState = false; // Reset the respawn flag
        }
    }

    removeEnemies() {
        for (let enemy of this.engine.currentScene.actors.filter(actor => actor instanceof Enemy)) {
            this.remove(enemy);
        }
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

    onActivate() {
        if (this.engine.enemyState !== undefined) {
            this.engine.enemyState = true;
        }
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const playerPos = this.player.pos;

        this.camera.pos = playerPos;
    }

}
