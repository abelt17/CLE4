import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Background } from "./background.js";

export class Level extends Scene {

    onActivate() {
        this.background = new Background(Resources.BridgeHome.toSprite(), 750, 370, 1.1, 1);
        this.add(this.background);
    }
}