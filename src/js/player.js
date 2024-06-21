import { Actor, Vector, Keys, SpriteSheet, CollisionType } from "excalibur";
import { Bridge } from "./bridge.js";
import { Enemy } from "./enemy.js";
import { Attacks } from './fightOverlay.js';
import { eventEmitter } from './eventEmitter.js';

let critter1, critter2, critter3, Resources;

async function initializeSpriteSheets() {
    const res = await import('./resources.js');
    Resources = res.Resources;

    critter1 = SpriteSheet.fromImageSource({
        image: Resources.Critter1,
        grid: {
            rows: 6,
            columns: 8,
            spriteWidth: 187.5,
            spriteHeight: 250
        }
    });

    critter2 = SpriteSheet.fromImageSource({
        image: Resources.Critter2,
        grid: {
            rows: 6,
            columns: 8,
            spriteWidth: 187.5,
            spriteHeight: 250
        }
    });

    critter3 = SpriteSheet.fromImageSource({
        image: Resources.Critter3,
        grid: {
            rows: 6,
            columns: 8,
            spriteWidth: 187.5,
            spriteHeight: 250
        }
    });
}

initializeSpriteSheets();

export let previousScene = {
    scene: '',
};

export const PlayerData = {
    health: 100,
    maxHealth: 100,
    xp: 0,
    level: 1,
    xpThreshold: 100,
    attackDamage: 10,
    previousHealth: 100,

    addXP(amount) {
        this.xp += amount;
        console.log(`Gained ${amount} XP, total XP: ${this.xp}`);
        this.checkLevelUp();
    },

    checkLevelUp() {
        while (this.xp >= this.xpThreshold) {
            this.levelUp();
        }
    },

    levelUp() {
        this.xp -= this.xpThreshold;
        this.level++;
        this.xpThreshold += 100; // Increase the XP threshold for the next level
        this.maxHealth += 20; // Increase max health
        this.health = this.maxHealth; // Restore health to max
        this.attackDamage += 5; // Increase attack damage

        console.log(`Leveled up to level ${this.level}! Health: ${this.health}, Attack Damage: ${this.attackDamage}, Next Level XP: ${this.xpThreshold}`);
    },
};

export class StaticPlayer extends Actor {
    constructor(width, height, selectedCritter) {
        super({
            width: width,
            height: height,
            pos: new Vector(390, 585),
        });

        if (selectedCritter === 'critter1') {
            this.graphics.use(critter1.getSprite(1, 0));
        } else if (selectedCritter === 'critter2') {
            this.graphics.use(critter2.getSprite(1, 0));
        } else if (selectedCritter === 'critter3') {
            this.graphics.use(critter3.getSprite(1, 0));
        } else {
            this.graphics.use(Resources.Critter1.toSprite());
            console.log("StaticPlayer actor failed to select");
        }
    }

    takeDamage(amount) {
        PlayerData.health -= amount;
        console.log(`Player health: ${PlayerData.health}`);
    }
}

export class Player extends Actor {
    constructor(width, height, selectedCritter) {
        super({
            width: width,
            height: height,
        });

        this.selectedCritter = selectedCritter;

        this.animationFrames = {
            backward: [{ row: 4, column: 0 }, { row: 5, column: 0 }, { row: 6, column: 0 }, { row: 7, column: 0 }],
            forward: [{ row: 0, column: 1 }, { row: 1, column: 1 }, { row: 2, column: 1 }, { row: 3, column: 1 }],
            right: [{ row: 4, column: 1 }, { row: 5, column: 1 }, { row: 6, column: 1 }, { row: 7, column: 1 }],
            left: [{ row: 0, column: 2 }, { row: 1, column: 2 }, { row: 2, column: 2 }, { row: 3, column: 2 }]
        };

        this.currentAnimationFrame = 0;
        this.setSpriteByDirection('backward');
        this.body.collisionType = CollisionType.Active;
    }

    setSpriteByDirection(direction) {
        let frame = this.animationFrames[direction][this.currentAnimationFrame];

        if (this.selectedCritter === 'critter1') {
            this.graphics.use(critter1.getSprite(frame.row, frame.column));
        } else if (this.selectedCritter === 'critter2') {
            this.graphics.use(critter2.getSprite(frame.row, frame.column));
        } else if (this.selectedCritter === 'critter3') {
            this.graphics.use(critter3.getSprite(frame.row, frame.column));
        } else {
            this.graphics.use(Resources.Critter3.toSprite());
            console.log("Player actor failed to select critter");
        }
    }

    updateAnimation(direction) {
        this.currentAnimationFrame++;
        if (this.currentAnimationFrame >= this.animationFrames[direction].length) {
            this.currentAnimationFrame = 0;
        }
        this.setSpriteByDirection(direction);
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
        let direction = '';

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -200;
            direction = 'forward';
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 200;
            direction = 'backward';
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 200;
            direction = 'right';
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -200;
            direction = 'left';
        }
        if (direction !== '') {
            this.updateAnimation(direction);
        }


        if (engine.input.keyboard.wasPressed(Keys.ControlLeft) || engine.input.keyboard.wasPressed(Keys.ControlRight)) {
            PlayerData.previousScene = engine.currentScene.key;
            this.scene.engine.goToScene('playerInfo');
        }

        this.vel = new Vector(xspeed, yspeed);
        this.graphics.flipHorizontal = (this.vel.x > 0);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Bridge) {
            if (event.other.identifier === "level1_bridge") {
                this.scene.engine.goToScene('level2');
                PlayerData.previousScene = 'level2';
            } else if (event.other.identifier === "level2_bridge") {
                this.scene.engine.goToScene('level1');
                PlayerData.previousScene = 'level1';
            } else if (event.other.identifier === "level3_bridge") {
                this.scene.engine.goToScene('level3');
                PlayerData.previousScene = 'level3';
            } else if (event.other.identifier === "level4_bridge") {
                this.scene.engine.goToScene('level2');
                PlayerData.previousScene = 'level2';
            } else if (event.other.identifier === "villa-baobab") {
                this.scene.engine.goToScene('villa-baobab');
                PlayerData.previousScene = 'villa-baobab';
            }
        }

        if (event.other instanceof Enemy) {
            const enemyType = event.other.identifier; // save the enemy in a variable
            this.scene.engine.goToScene('enemyFight');
            this.scene.engine.currentEnemy = event.other; // Track the current enemy
            const enemyFightScene = this.scene.engine.scenes.enemyFight;
            enemyFightScene.updateEnemy(enemyType); // Change the enemy
        }
    }
}

export class Cursor extends Actor {
    constructor(x, y) {
        super({
            width: Resources.Cursor.width,
            height: Resources.Cursor.height,
        });
        this.graphics.use(Resources.Cursor.toSprite());
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.scale = new Vector(0.01, 0.01);
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -200;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 200;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 200;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -200;
        }
        this.vel = new Vector(xspeed, yspeed);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Attacks) {
            if (event.other.identifier === "Blast") {
                eventEmitter.emit('attackHit', { identifier: 'Blast' });
            } else if (event.other.identifier === "Obliterate") {
                eventEmitter.emit('attackHit', { identifier: 'Obliterate' });
            }
        }
    }
}
