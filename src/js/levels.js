import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer, Keys, EasingFunctions } from "excalibur";
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
        // Listen for attack events
        eventEmitter.on('attackHit', (data) => {
            this.handleAttackHit(data.identifier);
        });
        this.currentTurn = 'player'; // Start with the player's turn
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        // Create the fade-in actor
        const screenWidth = engine.drawWidth;
        const screenHeight = engine.drawHeight;

        this.fadeInActor = new Actor({
            pos: new Vector(0, 0), // Top-left corner of the screen
            width: screenWidth,
            height: screenHeight,
            color: Color.Black,
            opacity: 1, // Start opacity
            z: 1000 // High z index to ensure it is on top
        });
        this.fadeInActor.anchor.setTo(0, 0); // Ensures the anchor is at the top-left
        this.add(this.fadeInActor);
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        // Create the fade-in actor
        const screenWidth = engine.drawWidth;
        const screenHeight = engine.drawHeight;

        this.fadeInActor = new Actor({
            pos: new Vector(0, 0), // Top-left corner of the screen
            width: screenWidth,
            height: screenHeight,
            color: Color.Black,
            opacity: 1, // Start opacity
            z: 1000 // High z index to ensure it is on top
        });
        this.fadeInActor.anchor.setTo(0, 0); // Ensures the anchor is at the top-left
        this.add(this.fadeInActor);
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
        if (this.currentTurn === 'player') {
            this.processPlayerAttack(identifier);
        } else if (this.currentTurn === 'enemy') {
            this.enemyAttack();
        }
    }

    processPlayerAttack(identifier) {
        let hitChance;
        let damage;

        if (identifier === "attack1") {
            hitChance = 0.8; // 80% chance to hit for attack1
            damage = Math.floor(Math.random() * 5) + 15 + PlayerData.attackDamage;
        } else if (identifier === "attack2") {
            hitChance = 0.6; // 60% chance to hit for attack2
            damage = Math.floor(Math.random() * 40) + 2 + PlayerData.attackDamage;
        }

        if (Math.random() < hitChance) { // Check if the attack hits
            if (this.enemy) {
                this.enemy.health -= damage;
                console.log(`Enemy health: ${this.enemy.health}`);
            }

            if (this.enemy && this.enemy.health <= 0) {
                this.onEnemyDefeated();
                return;
            }
        } else {
            console.log(`${identifier} missed!`);
        }

        this.currentTurn = 'enemy'; // Switch to enemy's turn
        setTimeout(() => this.enemyAttack(), 1000); // Delay for 1 second before enemy attacks
    }

    enemyAttack() {
        const hitChance = 0.75; // 75% chance to hit for enemy's attack
        if (Math.random() < hitChance) { // Check if the attack hits
            let damage;
            if (this.enemy.identifier === "fish") {
                damage = Math.floor(Math.random() * 20) + 1; // Damage for fish
            } else if (this.enemy.identifier === "spider") {
                damage = Math.floor(Math.random() * 40) + 10; // Higher damage for spider
            }

            PlayerData.health -= damage;
            console.log(`Player health: ${PlayerData.health}`);

            if (PlayerData.health <= 0) {
                console.log('Player defeated!');
                // PlayerData.previousHealth = PlayerData.health; // Store current health before dying
                this.engine.goToScene('deathScreen');
            }
        } else {
            console.log("Enemy's attack missed!");
        }

        setTimeout(() => {
            this.currentTurn = 'player'; // Switch back to player's turn after a delay
        }, 1000); // Delay for 1 second before switching back to player's turn
    }

    onEnemyDefeated() {
        let xpGained;
        if (this.enemy.identifier === "fish") {
            xpGained = 100; // XP for defeating a fish
        } else if (this.enemy.identifier === "spider") {
            xpGained = 10; // XP for defeating a spider
        }

        PlayerData.addXP(xpGained);

        this.fadeInActor.actions.fade(1, 1000, EasingFunctions.EaseInOutCubic).callMethod(() => {
            this.engine.goToScene('level1');
            this.engine.defeatedEnemy = this.engine.currentEnemy; // Track the defeated enemy
        });
    }

    onActivate() {
        this.fadeInActor.opacity = 1; // Ensures it starts fully opaque
        this.fadeInActor.actions.fade(0, 1000, EasingFunctions.EaseInOutCubic);
    }
}

export class Level1 extends Scene {
    onInitialize(engine) {
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
        if (this.engine.enemyState) {
            if (this.engine.enemyState) {
                this.removeEnemies();
                this.spawnEnemies();
                this.engine.enemyState = false; // Reset the respawn flag
            }

            // Fades in the scene when activated
            this.fadeInActor.actions.fade(0, 1000, EasingFunctions.EaseInOutCubic);
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
