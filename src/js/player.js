import { Actor, Vector, Keys, clamp, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Bridge } from "./bridge.js";

export class Player extends Actor {

    constructor() {
        super({
            width: Resources.Fish.width,
            height: Resources.Fish.height,
        })
        this.graphics.use(Resources.Fish.toSprite());
        this.pos = new Vector(400, 400);
        this.vel = new Vector(0, 0);
    }

    
    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
        
        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -100;
        }

        if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 100;
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 100
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -100
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
    }
}