import { Actor, Scene, Vector, Color, Label, Font, Keys, EasingFunctions } from "excalibur";
import { Resources } from './resources.js';
import { Background } from "./background.js";

export class SelectScene extends Scene {
    onInitialize(engine) {

        this.background = new Background(Resources.Podiums.toSprite(), 640, 370, 2.2, 2.1);
        this.add(this.background);

        const sprite1 = new Actor({
            pos: new Vector(260, 450),
            scale: new Vector(0.1, 0.1)
        });
        sprite1.graphics.use(Resources.Jake.toSprite());

        const sprite2 = new Actor({
            pos: new Vector(630, 420),
            scale: new Vector(0.1, 0.1)
        });
        sprite2.graphics.use(Resources.Jake.toSprite());

        const sprite3 = new Actor({
            pos: new Vector(1000, 480),
            scale: new Vector(0.1, 0.1)
        });
        sprite3.graphics.use(Resources.Jake.toSprite());

        const label1 = new Label({
            text: "Critter1",
            pos: new Vector(260, 350),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        const label2 = new Label({
            text: "Critter2",
            pos: new Vector(630, 320),
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24
            })
        });

        const label3 = new Label({
            text: "Critter3",
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
                engine.goToScene('level1');
            } else if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
                console.log("Critter2 selected");
                engine.goToScene('level1');
            } else if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
                console.log("Critter3 selected");
                engine.goToScene('level1');
            }
        });
    }
}
