import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer, Keys, Label, Font } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Attacks extends Actor {
    constructor(sprite, x, y, identifier) {
        super({
            pos: new Vector(x, y),
            width: 200,
            height: 200,
        });
        this.graphics.use(sprite);
        this.identifier = identifier;
    }

}
