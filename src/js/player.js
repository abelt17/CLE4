import { Actor, Vector, Keys, clamp, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Bridge } from "./bridge.js";
import { Enemy } from "./enemy.js";

export const PlayerData = {
    health: 100,
    xp: 0,
};

export class StaticPlayer extends Actor {
    constructor(x, y) {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height,
        })
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = new Vector(x, y);
    }

}

export class Player extends Actor {

    constructor(x, y) {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height,
        })
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
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
            xspeed = 200
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -200
        }
        this.vel = new Vector(xspeed, yspeed);
        this.graphics.flipHorizontal = (this.vel.x > 0)
    }
    
    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Bridge) {
            if (event.other.identifier === "level1_bridge") {
                this.scene.engine.goToScene('level2');
            } else if (event.other.identifier === "level2_bridge") {
                this.scene.engine.goToScene('level1');
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