import { Scene, Actor, Color, Label, Keys, Font, Vector } from 'excalibur';
import { Background } from './background';
import { Resources } from './resources';

class MainMenuScene extends Scene {
    onInitialize(engine) {
        super.onInitialize(engine);

        const background1 = new Background(Resources.WindowsHills.toSprite(), 750, 370, 1.1, 1);
        this.add(background1);

        const welcomeLabel = new Label({
            text: 'Crittermon',
            pos: new Vector(500, 250),
            font: new Font({
                size: 70,
                family: 'sans-serif',
                color: Color.White,
                bold: true
            })
        });

        const subLabel = new Label({
            text: 'Press Enter to start',
            pos: new Vector(580, 400),
            font: new Font({
                size: 40,
                family: 'sans-serif',
                color: Color.White,
                bold: true
            })
        });

        this.add(welcomeLabel);
        this.add(subLabel);
    }


    update(engine, delta) {
        super.update(engine, delta);

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene('intro');
        }
    }
}

export { MainMenuScene };
