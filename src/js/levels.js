import { Actor, Scene, Vector, Color, BoundingBox, Sound, Font, Keys, EasingFunctions, Label, TextAlign, Shape, CollisionType, CompositeCollider, KillEvent } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player, StaticPlayer, PlayerData, Cursor, previousScene } from './player.js';
import { Background } from "./background.js";
import { Bridge } from "./bridge.js";
import { Boss, Enemy, Prof, StaticEnemy } from "./enemy.js";
import { Attacks } from "./fightOverlay.js";
import { eventEmitter } from './eventEmitter.js';

// ColliderGroup class definition
export class ColliderGroup extends Actor {
    onInitialize(engine) {
        let landscape = new CompositeCollider([
            Shape.Edge(new Vector(-2400, 1650), new Vector(1600, 1650)),
            Shape.Edge(new Vector(1600, 1650), new Vector(1600, 930)), // Bridge
            Shape.Edge(new Vector(1600, 930), new Vector(2500, 930)), // Bridge
            Shape.Edge(new Vector(3000, 930), new Vector(3000, 480)), // Bridge
            Shape.Edge(new Vector(3000, 480), new Vector(1600, 480)), // Bridge

            Shape.Edge(new Vector(1600, 480), new Vector(1600, -2350)),
            Shape.Edge(new Vector(1600, -2350), new Vector(-2400, -2350)),
            Shape.Edge(new Vector(-2400, -2350), new Vector(-2400, 1650))
        ]);
        this.body.collisionType = CollisionType.Fixed;
        this.collider.set(landscape);
        this.pos = new Vector(400, 350);
    }
}

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
            pos: new Vector(120, 350),
            font: new Font({
                family: 'Arial',
                size: 30,
                color: Color.White
            }),
            textAlign: TextAlign.Center
        });

        this.enemyHealthLabel = new Label({
            text: '',
            pos: new Vector(900, 460),
            font: new Font({
                family: 'Arial',
                size: 25,
                color: Color.Red,
                bold: true
            }),
            textAlign: TextAlign.Center
        });

        this.playerHealthLabel = new Label({
            text: '',
            pos: new Vector(300, 690),
            font: new Font({
                family: 'Arial',
                size: 25,
                color: Color.Red,
                bold: true
            }),
            textAlign: TextAlign.Center
        });

    }

    onActivate() {
        this.updatePlayer(this.engine);
        this.updateLabels(); // Update labels when the scene activates
    }

    updatePlayer(engine) {
        this.player = new StaticPlayer(800, 600, engine.selectedPlayer);
        this.add(this.player);
    }

    updateEnemy(identifier) {
        if (this.cursor) this.remove(this.cursor);
        if (this.enemy) this.remove(this.enemy);
        if (this.player) this.remove(this.player);
        if (this.attack1) this.remove(this.attack1);
        if (this.attack2) this.remove(this.attack2);
        if (this.attackMessageLabel) this.remove(this.attackMessageLabel);
        if (this.enemyHealthLabel) this.remove(this.enemyHealthLabel);
        if (this.playerHealthLabel) this.remove(this.playerHealthLabel);

        if (!this.background) {
            this.background = new Background(Resources.FightScene.toSprite(), 640, 360, 1, 1);
            this.add(this.background);
        }

        this.add(this.attackMessageLabel);
        this.add(this.playerHealthLabel);


        if (identifier === "incinerose") {
            this.enemy = new StaticEnemy(Resources.Incinerose.toSprite(), 1000, 300, "incinerose", this);
        } else if (identifier === "chomperdaisy") {
            this.enemy = new StaticEnemy(Resources.Chomperdaisy.toSprite(), 1000, 300, "chomperdaisy", this);
        } else if (identifier === "bazookerlilly") {
            this.enemy = new StaticEnemy(Resources.Bazookerlilly.toSprite(), 1000, 300, "bazookerlilly", this);
        } else if (identifier === "thegnome") {
            this.enemy = new StaticEnemy(Resources.thegnome.toSprite(), 950, 200, "thegnome", this);
        } else if (identifier === "sparringspar") {
            this.enemy = new StaticEnemy(Resources.sparringspar.toSprite(), 1000, 180, "sparringspar", this);
        } else if (identifier === "bmxbrainiac") {
            this.enemy = new StaticEnemy(Resources.bmxbrainiac.toSprite(), 1000, 180, "bmxbrainiac", this);
        } else if (identifier === "symphonyofroses") {
            this.enemy = new StaticEnemy(Resources.symphonyofroses.toSprite(), 1000, 180, "symphonyofroses", this);
        } else if (identifier === "petuninja") {
            this.enemy = new StaticEnemy(Resources.petuninja.toSprite(), 1000, 300, "petuninja", this);
        } else if (identifier === "ambushengage") {
            this.enemy = new StaticEnemy(Resources.battleambush.toSprite(), 1000, 300, "ambushengage", this);
        } else if (identifier === "scarecrow") {
            this.enemy = new StaticEnemy(Resources.scarecrow.toSprite(), 1000, 180, "scarecrow", this);
        } else if (identifier === "sparringsparsparringpartner") {
            this.enemy = new StaticEnemy(Resources.sparringsparsparringpartner.toSprite(), 1000, 180, "sparringsparsparringpartner", this);
        } else if (identifier === "thegardener") {
            this.enemy = new StaticEnemy(Resources.thegardener.toSprite(), 1000, 180, "thegardener", this);
        } else if (identifier === "toblowupmate-os") {
            this.enemy = new StaticEnemy(Resources.toblowuupmate.toSprite(), 1000, 180, "toblowupmate-os", this);
        } else if (identifier === "baobab") {
            this.enemy = new StaticEnemy(Resources.profacacia.toSprite(), 1000, 180, "baobab", this);
        }
        this.add(this.enemy);
        this.add(this.enemyHealthLabel);

        this.attack1 = new Attacks(Resources.blast.toSprite(), 200, 200, "Blast");
        this.attack2 = new Attacks(Resources.obliterate.toSprite(), 500, 200, "Obliterate");
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
                hitChance = 0.9; // 90% chance to hit
                if (Math.random() < hitChance) {

                    damage = Math.floor(Math.random() * PlayerData.blast) + 5 + PlayerData.attackDamage;

                    this.enemy.shake(); // Shake the enemy on hit
                    this.enemy.emitParticles(); // Emit particles on hit
                    this.enemy.health -= damage;
                    this.attackMessage = `Player attacked with ${identifier} and dealt ${damage} damage!`;
                } else {
                    this.attackMessage = `${identifier} missed!`;
                }
                break;
            case "Obliterate":
                hitChance = 0.6; // 60% chance to hit
                if (Math.random() < hitChance) {

                    damage = Math.floor(Math.random() * PlayerData.obliterate) + PlayerData.attackDamage;

                    this.enemy.shake(); // Shake the enemy on hit
                    this.enemy.emitParticles(); // Emit particles on hit
                    this.enemy.health -= damage;
                    this.attackMessage = `Player attacked with ${identifier} and dealt ${damage} damage!`;
                } else {
                    this.attackMessage = `${identifier} missed!`;
                }
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
                let otherHitChance = 0.3;
                if (Math.random() < hitChance) {
                    if (this.enemy.identifier === "incinerose") {
                        damage = Math.floor(Math.random() * 10) + 5;
                    } else if (this.enemy.identifier === "chomperdaisy") {
                        damage = Math.floor(Math.random() * 10) + 10;
                    } else if (this.enemy.identifier === "bazookerlilly") {
                        damage = Math.floor(Math.random() * 30) + 10;
                    } else if (this.enemy.identifier === "thegnome") {
                        if (Math.random() < otherHitChance) {
                            damage = Math.floor(Math.random() * 80) + 40;
                        } else {
                            damage = 1;
                        }

                    } else if (this.enemy.identifier === "sparringspar") {
                        damage = Math.floor(Math.random() * 25) + 25;
                    } else if (this.enemy.identifier === "bmxbrainiac") {
                        damage = Math.floor(Math.random() * 50) + 20;
                    } else if (this.enemy.identifier === "symphonyofroses") {
                        damage = Math.floor(Math.random() * 45) + 30;
                    } else if (this.enemy.identifier === "petuninja") {
                        damage = Math.floor(Math.random() * 30) + 30;
                    } else if (this.enemy.identifier === "ambushengage") {
                        damage = Math.floor(Math.random() * 20) + 35;
                    } else if (this.enemy.identifier === "scarecrow") {
                        damage = Math.floor(Math.random() * 50) + 13;
                    } else if (this.enemy.identifier === "sparringsparsparringpartner") {
                        damage = Math.floor(Math.random() * 80) + 45;
                    } else if (this.enemy.identifier === "thegardener") {
                        damage = Math.floor(Math.random() * 69) + 10;
                    } else if (this.enemy.identifier === "toblowupmate-os") {
                        damage = Math.floor(Math.random() * 70) + 30;
                    } else if (this.enemy.identifier === "baobab") {
                        damage = Math.floor(Math.random() * 100) + 100;
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
        } else if (this.enemy.identifier === "bazookerlilly") {
            xpGained = 150;
        } else if (this.enemy.identifier === "thegnome") {
            xpGained = 500;
            this.engine.defeatedBosses["thegnome"] = true; // Mark thegnome as defeated
        } else if (this.enemy.identifier === "sparringspar") {
            xpGained = 600;
            this.engine.defeatedBosses["sparringspar"] = true; // Mark sparringspar as defeated
        } else if (this.enemy.identifier === "bmxbrainiac") {
            xpGained = 600;
            this.engine.defeatedBosses["bmxbrainiac"] = true;
        } else if (this.enemy.identifier === "symphonyofroses") {
            xpGained = 600;
            this.engine.defeatedBosses["symphonyofroses"] = true;
        } else if (this.enemy.identifier === "petuninja") {
            xpGained = 250;
        } else if (this.enemy.identifier === "ambushengage") {
            xpGained = 300;
        } else if (this.enemy.identifier === "scarecrow") {
            xpGained = 700;
            this.engine.defeatedBosses["scarecrow"] = true;
        } else if (this.enemy.identifier === "sparringsparsparringpartner") {
            xpGained = 2000;
            this.engine.defeatedBosses["sparringsparsparringpartner"] = true;
        } else if (this.enemy.identifier === "toblowupmate-os") {
            xpGained = 2000;
            this.engine.defeatedBosses["toblowupmate-os"] = true;
        } else if (this.enemy.identifier === "thegardener") {
            xpGained = 2000;
            this.engine.defeatedBosses["thegardener"] = true;
        } else if (this.enemy.identifier === "baobab") {
            xpGained = 2000;
            this.engine.defeatedBosses["baobab"] = true;
        }
        PlayerData.addXP(xpGained);
        
        this.engine.goToScene(previousScene.scene);
        this.engine.defeatedEnemy = this.engine.currentEnemy; // Track the defeated enemy
    }

    onPlayerDefeated() {
        this.engine.goToScene('deathScreen');
        PlayerData.xp = 0;
    }
}

export class Level1 extends Scene {
    onInitialize(engine) {
        if (this.engine.enemyState === undefined) {
            this.engine.enemyState = false;
        }

        this.collider = new ColliderGroup();
        this.add(this.collider);

        previousScene.scene = 'level1'

        this.background = new Background(Resources.Level1bg.toSprite(), 0, 0, 2, 2);
        this.add(this.background);

        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), 3600, 1200, 2, 2, 500, 500, "level1_bridge");
        this.add(this.bridge);

        this.villa = new Bridge(Resources.Villa.toSprite(), -780, -600, 1, 1, 100, 100, "villaBaobab");
        this.add(this.villa);

        this.spawnEnemies();

        this.player = new Player(180, 200, engine.selectedPlayer);
        this.player.pos = new Vector(-780, -370);
        this.add(this.player);

        // Create the fade-in actor
        this.fadeInActor = new Actor({
            pos: new Vector(640, 360),
            width: 4500,
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
        previousScene.scene = 'level1'
        if (this.engine.playerPos) {
            this.player.pos = new Vector(-780, -370);
            this.engine.playerPos = false;
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

        if (!this.engine.defeatedBosses["thegnome"]) {
            this.thegnome = new Boss(Resources.thegnome.toSprite(), -1310, -1140, Resources.thegnome.width - 100, Resources.thegnome.height - 100, "thegnome");
            this.add(this.thegnome);
        }

        if (!this.engine.defeatedBosses["sparringspar"]) {
            this.sparringspar = new Boss(Resources.sparringspar.toSprite(), 2800, 950, Resources.sparringspar.width - 100, Resources.sparringspar.height - 100, "sparringspar");
            this.add(this.sparringspar);
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
    onInitialize(engine) {

        previousScene.scene = 'level2'

        this.background = new Background(Resources.Level2bg.toSprite(), 0, 0, 2, 2);
        this.add(this.background);

        this.bridge = new Bridge(Resources.PixelArtBridge.toSprite(), -1800, 0, 2, 2, 10, 500, "level2_bridge");
        this.add(this.bridge);

        this.bridge = new Bridge(Resources.StoneBridge.toSprite(), 3600, 0, 2, 2, 500, 500, "level3_bridge");
        this.add(this.bridge);


        this.spawnEnemies()

        this.player = new Player(180, 200, engine.selectedPlayer);
        this.player.pos = new Vector(-1600, 0);
        this.add(this.player);

        // Create the fade-in actor
        this.fadeInActor = new Actor({
            pos: new Vector(640, 360),
            width: 4500,
            height: 3000,
            color: Color.Black,
            opacity: 1
        });
        this.fadeInActor.anchor.setTo(0.5, 0.5);
        this.add(this.fadeInActor);
    }

    spawnEnemies() {
        for (let i = 0; i < 4; i++) {
            this.bazookerlilly = new Enemy(Resources.Bazookerlilly.toSprite(), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Resources.Bazookerlilly.width - 100, Resources.Bazookerlilly.height - 100, "bazookerlilly")
            this.add(this.bazookerlilly)
        }
        if (!this.engine.defeatedBosses["bmxbrainiac"]) {
            this.bmxbrainiac = new Boss(Resources.bmxbrainiac.toSprite(), -1310, -1140, Resources.bmxbrainiac.width - 100, Resources.bmxbrainiac.height - 100, "bmxbrainiac");
            this.add(this.bmxbrainiac);
        }

        if (!this.engine.defeatedBosses["symphonyofroses"]) {
            this.symphonyofroses = new Boss(Resources.symphonyofroses.toSprite(), 670, -1490, Resources.symphonyofroses.width - 100, Resources.symphonyofroses.height - 100, "symphonyofroses");
            this.add(this.symphonyofroses);
        }

        if (!this.engine.defeatedBosses["thegardener"]) {
            this.thegardener = new Boss(Resources.thegardener.toSprite(), 2600, -100, Resources.thegardener.width - 100, Resources.thegardener.height - 100, "thegardener");
            this.add(this.thegardener);
        }

    }

    removeEnemies() {
        for (let enemy of this.engine.currentScene.actors.filter(actor => actor instanceof Enemy)) {
            this.remove(enemy);
        }
    }

    onActivate() {
        if (this.engine.enemyState !== undefined) {
            this.engine.enemyState = true;
        }

        if (this.engine.enemyState) {
            this.removeEnemies();
            this.spawnEnemies();
            this.engine.enemyState = false; // Reset the respawn flag
        }

        // Fade in the scene when activated
        this.fadeInActor.actions.fade(0, 1000, EasingFunctions.EaseInOutCubic);
        previousScene.scene = 'level2'
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const playerPos = this.player.pos;

        this.camera.pos = playerPos;

        if (engine.defeatedEnemy) {
            this.remove(engine.defeatedEnemy);
            engine.defeatedEnemy = null; // Reset after removal
        }
    }
}

export class Level3 extends Scene {
    onInitialize(engine) {

        previousScene.scene = 'level3'

        this.background = new Background(Resources.Level3bg.toSprite(), 0, 0, 2, 2);
        this.add(this.background);

        this.hefbrug = new Background(Resources.Hefbrug.toSprite(), 2500, 0, 1, 1);
        this.add(this.hefbrug);

        this.bridge = new Bridge(Resources.StoneBridge.toSprite(), -1800, 370, 2, 2, 10, 500, "level4_bridge");
        this.add(this.bridge);


        this.spawnEnemies();

        this.player = new Player(180, 200, engine.selectedPlayer);
        this.player.pos = new Vector(-1600, 0);
        this.add(this.player);

        // Create the fade-in actor
        this.fadeInActor = new Actor({
            pos: new Vector(640, 360),
            width: 4500,
            height: 3000,
            color: Color.Black,
            opacity: 1
        });
        this.fadeInActor.anchor.setTo(0.5, 0.5);
        this.add(this.fadeInActor);
    }

    spawnEnemies() {
        for (let i = 0; i < 4; i++) {
            this.petuninja = new Enemy(Resources.petuninja.toSprite(), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Resources.petuninja.width - 100, Resources.petuninja.height - 100, "petuninja")
            this.add(this.petuninja)
        }

        for (let i = 0; i < 6; i++) {
            this.ambushengage = new Enemy(Resources.ambushengage.toSprite(), Math.floor(Math.random() * 1000) + 100, Math.floor(Math.random() * 1000) + 100, Resources.ambushengage.width - 100, Resources.ambushengage.height - 100, "ambushengage");
            this.add(this.ambushengage);
        }

        if (!this.engine.defeatedBosses["scarecrow"]) {
            this.scarecrow = new Boss(Resources.scarecrow.toSprite(), 1480, 1500, Resources.scarecrow.width - 100, Resources.scarecrow.height - 100, "scarecrow");
            this.add(this.scarecrow);
        }

        if (!this.engine.defeatedBosses["sparringsparsparringpartner"]) {
            this.sparringsparsparringpartner = new Boss(Resources.sparringsparsparringpartner.toSprite(), 2600, -10, Resources.sparringsparsparringpartner.width - 100, Resources.sparringsparsparringpartner.height - 100, "sparringsparsparringpartner");
            this.add(this.sparringsparsparringpartner);
        }

        if (!this.engine.defeatedBosses["toblowupmate-os"]) {
            this.toblowupmate = new Boss(Resources.toblowuupmate.toSprite(), 1140, -1600, Resources.toblowuupmate.width - 100, Resources.toblowuupmate.height - 100, "toblowupmate-os");
            this.add(this.toblowupmate);
        }
        
        if (!this.engine.defeatedBosses["baobab"]) {
            this.baobab = new Boss(Resources.profacacia.toSprite(), -1400, -1550, Resources.profacacia.width - 100, Resources.profacacia.height - 100, "baobab");
            this.add(this.baobab);
        }
    }

    removeEnemies() {
        for (let enemy of this.engine.currentScene.actors.filter(actor => actor instanceof Enemy)) {
            this.remove(enemy);
        }
    }

    onActivate() {
        if (this.engine.enemyState !== undefined) {
            this.engine.enemyState = true;
        }

        if (this.engine.enemyState) {
            this.removeEnemies();
            this.spawnEnemies();
            this.engine.enemyState = false; // Reset the respawn flag
        }

        // Fade in the scene when activated
        this.fadeInActor.actions.fade(0, 1000, EasingFunctions.EaseInOutCubic);
        previousScene.scene = 'level3'

    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const playerPos = this.player.pos;

        this.camera.pos = playerPos;

        if (engine.defeatedEnemy) {
            this.remove(engine.defeatedEnemy);
            engine.defeatedEnemy = null; // Reset after removal
        }
    }
}

export class VillaBaobab extends Scene {
    constructor() {
        super();
        this.infoLabel = null; // Initialize infoLabel as null
        this.removeMeter = 0;
    }

    onInitialize(engine) {

        previousScene.scene = 'villaBaobab'

        this.background = new Background(Resources.VillaBaobabInside.toSprite(), 0, 0, 1, 1);
        this.add(this.background);

        this.baobab = new Prof(Resources.profacacia.toSprite(), 0, -150, 100, 100, "baobab");
        this.add(this.baobab);

        this.door = new Bridge(Resources.BaobabDoor.toSprite(), 0, 650, 1, 1, 100, 100, "baobab_door");
        this.add(this.door);

        this.infoLabel = new Label({
            text: 'Welcome to Villa Baobab!\n\nI am professor Baobab.\n\nYou can attack monsters by walking to them.\nThen choose blast, \nlower damage more hitchance,\nor obliterate, \nhigher damage lower hitchance.\n\nPress control to see the stats of your critter.\n\nWhen hurt in battle you can return to me\nand heal yourself by walking to me\n\n have fun beating monsters!',
            pos: new Vector(120, -300),
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            }),
            textAlign: TextAlign.Center
        });
        this.add(this.infoLabel);

        this.player = new Player(180, 200, engine.selectedPlayer);
        this.add(this.player);
    }

    onDeactivate() {
        this.removeMeter++;
        // Check if removeMeter has reached 2 (or any desired number)
        if (this.removeMeter === 2) {
            // Remove the info label from the scene
            this.remove(this.infoLabel);
        }
    }

    onActivate() {
        if (this.engine.enemyState !== undefined) {
            this.engine.enemyState = true;
        }
        previousScene.scene = 'villaBaobab'

        if (!this.engine.playerPos) {
            this.engine.playerPos = true;
        }
    }


    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        const playerPos = this.player.pos;

        this.camera.pos = playerPos;
    }

}