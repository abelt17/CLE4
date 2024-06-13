import { Actor, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from './resources.js';

export class Bridge extends Actor {
    constructor(sprite, x, y, xg, yg, width, height) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(xg, yg),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed,
            collider: Shape.Box(width, height)
        });
        this.graphics.use(sprite);
    }
}
