import { Actor, Engine, Vector, Keys, Color } from "excalibur"

export class Background extends Actor {
    constructor(sprite, x, y, xg, yg) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(xg, yg)
        });
        this.graphics.use(sprite);
    }
}
