import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer, Keys, Label } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';

export class Attacks extends Actor {
    constructor(x, y, identifier) {
        super({
            pos: new Vector(x, y),
            width: 200,
            height: 200,
            color: Color.Gray
        });
        this.identifier = identifier;
        this.textLabel = new Label({
            text: identifier,
            pos: new Vector(x, y), // Position relative to actor
            fontSize: 20,
            color: Color.White
        });
    }

    onInitialize() {
        // Add the text label to the scene
        this.scene.add(this.textLabel);
    }
}
