import { Actor, Scene, Vector, Color, BoundingBox, Sound, Timer } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js'

export class Level extends Scene {

    onActivate(){
        this.player = new Player();
        this.add(this.player);
    }
}

