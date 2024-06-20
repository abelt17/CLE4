import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer, Keys, EasingFunctions, Label, TextAlign } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player, StaticPlayer, PlayerData, Cursor } from './player.js'
import { Background } from "./background.js";
import { Bridge } from "./bridge.js";
import { Enemy, StaticEnemy } from "./enemy.js";
import { Attacks } from "./fightOverlay.js";
import { eventEmitter } from './eventEmitter.js';

// ColliderGroup class definition
// export class ColliderGroup extends Actor {
//     onInitialize(engine) {
//         let landscape = new CompositeCollider([
//             Shape.Edge(new Vector(51, -327), new Vector(1447, -327)),
//             Shape.Edge(new Vector(1447, -327), new Vector(1447, 1066)),
//             Shape.Edge(new Vector(1447, 1066), new Vector(51, 1066)),
//             Shape.Edge(new Vector(51, 1066), new Vector(51, -327))
//         ]);
//         this.body.collisionType = CollisionType.Fixed;
//         this.collider.set(landscape);
//         this.pos = new Vector(400, 350);
//     }
// }

export class EnemyFight extends Scene {
    constructor() {
        super();
        eventEmitter.on('attackHit', (data) => {
            this.handleAttackHit(data.identifier);
        });
        this.currentTurn = 'player'; // Start with the player's turn
        this.attackMessage = ''; // To store the attack message

        // Create labels
        this.attackMessageLabel = new Label({
            text: '',
            pos: new Vector(500, 600),
            fontSize: 36,
            color: Color.White,
            textAlign: TextAlign.Center
        });

        this.enemyHealthLabel = new Label({
            text: '',
            pos: new Vector(900, 50),
            fontSize: 48,
            color: Color.White,
            textAlign: TextAlign.Center
        });

        this.playerHealthLabel = new Label({
            text: '',
            pos: new Vector(350, 700),
            fontSize: 48,
            color: Color.White,
            textAlign: TextAlign.Center
        });

        this.add(this.attackMessageLabel);
        this.add(this.enemyHealthLabel);
        this.add(this.playerHealthLabel);
    }

    onActivate() {
        this.updateLabels(); // Update labels when the scene activates
    }

    updateEnemy(identifier) {
        this.remove(this.cursor);
        this.remove(this.enemy);
        this.remove(this.player);
        this.remove(this.attack1);
        this.remove(this.attack2);

        this.player = new StaticPlayer(400, 600);
        this.add(this.player);

        if (identifier === "incinerose") {
            this.enemy = new StaticEnemy(Resources.Incinerose.toSprite(), 1000, 300, "incinerose");
        } else if (identifier === "chomperdaisy") {
            this.enemy = new StaticEnemy(Resources.Chomperdaisy.toSprite(), 1000, 300, "chomperdaisy");
        }
        this.add(this.enemy);
        
        this.attack1 = new Attacks(200, 200, "Blast");
        this.attack2 = new Attacks(500, 200, "Obliterate");
        this.add(this.attack1);
        this.add(this.attack2);

        this.cursor = new Cursor(640, 360);
        this.add(this.cursor);

        this.updateLabels(); // Update labels when the enemy is updated
    }

    handleAttackHit(identifier) {
        let hitChance;
        let damage;
        switch (identifier) {
            case "Blast":
                hitChance = 0.8; // 80% chance to hit
                if (Math.random() < hitChance) {
                    if (this.enemy && this.enemy.identifier === "incinerose") {
                        damage = Math.floor(Math.random() * 5) + 5 + PlayerData.attackDamage;
                    } else if (this.enemy && this.enemy.identifier === "chomperdaisy") {
                        damage = Math.floor(Math.random() * 5) + 5 + PlayerData.attackDamage;
                    }
                    this.enemy.health -= damage;
                    this.attackMessage = `Player attacked with ${identifier} and dealt ${damage} damage!`;
                } else {
                    this.attackMessage = 'Attack 1 missed!';
                }
                break;
            case "Obliterate":
                hitChance = 0.6; // 60% chance to hit
                if (Math.random() < hitChance) {
                    if (this.enemy && this.enemy.identifier === "incinerose") {
                        damage = Math.floor(Math.random() * 30) + 1 + PlayerData.attackDamage;
                    } else if (this.enemy && this.enemy.identifier === "chomperdaisy") {
                        damage = Math.floor(Math.random() * 30) + 1 + PlayerData.attackDamage;
                    }
                    this.enemy.health -= damage;
                    this.attackMessage = `Player attacked with ${identifier} and dealt ${damage} damage!`;
                } else {
                    this.attackMessage = 'Attack 2 missed!';
                }
                // setTimeout(() => this.enemyAttack(), 1000); // Delay for 1 second before enemy attacks

                break;
            default:
                break;
        }

        this.updateLabels();

        if (this.enemy && this.enemy.health <= 0) {
            this.onEnemyDefeated();
        } else {
            this.currentTurn = 'enemy'; // Switch to enemy's turn after player attacks
            this.enemyAttack();
        }
    }

    enemyAttack() {
        if (this.currentTurn === 'enemy') {
            setTimeout(() => {
                let damage;
                let hitChance = 0.7; // 70% chance for enemy to hit
                if (Math.random() < hitChance) {
                    if (this.enemy.identifier === "incinerose") {
                        damage = Math.floor(Math.random() * 10) + 5;
                    } else if (this.enemy.identifier === "chomperdaisy") {
                        damage = Math.floor(Math.random() * 20) + 10;
                    }
                    PlayerData.health -= damage;
                    this.attackMessage = `${this.enemy.identifier} attacked and dealt ${damage} damage!`;
                } else {
                    this.attackMessage = `${this.enemy.identifier} attack missed!`;
                }
                this.updateLabels();

                if (PlayerData.health <= 0) {
                    this.onPlayerDefeated();
                } else {
                    this.currentTurn = 'player'; // Switch back to player's turn after enemy attacks
                }
            }, 1000); // Delay enemy attack by 1 second
        }
    }

    updateLabels() {
        this.attackMessageLabel.text = this.attackMessage;
        this.enemyHealthLabel.text = `Enemy Health: ${this.enemy ? this.enemy.health : ''}`;
        this.playerHealthLabel.text = `Player Health: ${PlayerData.health}`;
    }

    onEnemyDefeated() {
        let xpGained;
        if (this.enemy.identifier === "incinerose") {
            xpGained = 100; // XP for defeating a incinerose
        } else if (this.enemy.identifier === "chomperdaisy") {
            xpGained = 50; // XP for defeating a chomperdaisy
        }
    
        PlayerData.addXP(xpGained);
        
        this.engine.goToScene('level1');
        this.engine.defeatedEnemy = this.engine.currentEnemy; // Track the defeated enemy
    }
    
    onPlayerDefeated() {
        this.engine.goToScene('deathScreen');
    }
}

export class Level1 extends Scene {
    onInitialize(engine) {
        if (this.engine.enemyState === undefined) {
            this.engine.enemyState = false;
        }

        this.background = new Background(Resources.Level1bg.toSprite(), 0, 0, 2, 2);
        this.add(this.background);

        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 3600, 1200, 2, 2, 500, 500, "level1_bridge");
        this.add(this.bridge);

        this.villa = new Bridge(Resources.Villa.toSprite(), -780, -600, 1, 1, 100, 100, "villa-baobab");
        this.add(this.villa);

        this.spawnEnemies();

        this.player = new Player(400, 400);
        this.add(this.player);

        // Create the fade-in actor
        this.fadeInActor = new Actor({
            pos: new Vector(640, 360),
            width: 4000,
            height: 3000,
            color: Color.Black,
            opacity: 1
        });
        this.fadeInActor.anchor.setTo(0.5, 0.5);
        this.add(this.fadeInActor);
    }

    onActivate() {
        if (this.engine.enemyState) {
            this.removeEnemies();
            this.spawnEnemies();
            this.engine.enemyState = false; // Reset the respawn flag
        }

        // Fade in the scene when activated
        this.fadeInActor.actions.fade(0, 1000, EasingFunctions.EaseInOutCubic);
    }

    removeEnemies() {
        for (let enemy of this.engine.currentScene.actors.filter(actor => actor instanceof Enemy)) {
            this.remove(enemy);
        }
    }

    spawnEnemies() {
        for (let i = 0; i < 3; i++) {
            this.incinerose = new Enemy(Resources.Incinerose.toSprite(), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Resources.Incinerose.width - 100, Resources.Incinerose.height - 100, "incinerose");
            this.add(this.incinerose);
        }

        for (let i = 0; i < 6; i++) {
            this.chomperdaisy = new Enemy(Resources.Chomperdaisy.toSprite(), Math.floor(Math.random() * 1000) + 100, Math.floor(Math.random() * 1000) + 100, Resources.Chomperdaisy.width - 100, Resources.Chomperdaisy.height - 100, "chomperdaisy");
            this.add(this.chomperdaisy);
        }
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

        // Create the fade-in actor
        this.fadeInActor = new Actor({
            pos: new Vector(640, 360),
            width: 4000,
            height: 3000,
            color: Color.Black,
            opacity: 1
        });
        this.fadeInActor.anchor.setTo(0.5, 0.5);
        this.add(this.fadeInActor);
    }

    onActivate() {
        if (this.engine.enemyState !== undefined) {
            this.engine.enemyState = true;
        }

        // Fade in the scene when activated
        this.fadeInActor.actions.fade(0, 1000, EasingFunctions.EaseInOutCubic);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const playerPos = this.player.pos;

        this.camera.pos = playerPos;
    }
}
