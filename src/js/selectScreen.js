import { Actor, Scene, Vector, Color, Label, Font, Keys, SpriteSheet } from "excalibur";
import { Resources } from './resources.js';
import { Background } from "./background.js";
import { Player } from './player.js';

export let selectedCritter = '';

export class SelectScene extends Scene {
    onInitialize(engine) {

        this.background = new Background(Resources.Podiums.toSprite(), 640, 370, 2.2, 2.1);
        this.add(this.background);

        const critter1 = SpriteSheet.fromImageSource({
            image: Resources.Critter1,
            grid: {
                rows: 6,
                columns: 8,
                spriteWidth: 187.5,
                spriteHeight: 250
            }
        });

        const critter2 = SpriteSheet.fromImageSource({
            image: Resources.Critter2,
            grid: {
                rows: 6,
                columns: 8,
                spriteWidth: 187.5,
                spriteHeight: 250
            }
        });

        const critter3 = SpriteSheet.fromImageSource({
            image: Resources.Critter3,
            grid: {
                rows: 6,
                columns: 8,
                spriteWidth: 187.5,
                spriteHeight: 250
            }
        });

        const scale = new Vector(0.6, 0.6);

        const sprite1 = new Actor({
            pos: new Vector(260, 450),
            scale: scale
        });

        sprite1.graphics.use(critter1.getSprite(0, 0));

        const sprite2 = new Actor({
            pos: new Vector(630, 420),
            scale: scale
        });

        sprite2.graphics.use(critter2.getSprite(0, 0));

        const sprite3 = new Actor({
            pos: new Vector(1000, 480),
            scale: scale
        });

        sprite3.graphics.use(critter3.getSprite(0, 0));

        const label1 = new Label({
            text: "A",
            pos: new Vector(260, 350),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        const label2 = new Label({
            text: "W",
            pos: new Vector(630, 320),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        const label3 = new Label({
            text: "D",
            pos: new Vector(1000, 380),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        this.add(sprite1);
        this.add(sprite2);
        this.add(sprite3);
        this.add(label1);
        this.add(label2);
        this.add(label3);

        this.on('preupdate', (evt) => {
            if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
                console.log("Critter1 selected");
                engine.selectedCritter = 'critter1';
                engine.goToScene('level1');
            } else if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
                console.log("Critter2 selected");
                engine.selectedCritter = 'critter2';
                engine.goToScene('level1');
            } else if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
                console.log("Critter3 selected");
                engine.selectedCritter = 'critter3';
                engine.goToScene('level1');
            }
        });
    }
    selectCritterAndGoToLevel(engine, critterKey) {
        engine.selectedCritter = critterKey;
        engine.goToScene('level1');
    }
}
