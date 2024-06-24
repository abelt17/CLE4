import { Scene, Actor, Color, Label, Keys, Font, Vector } from 'excalibur';
import { Background } from './background';
import { Resources } from './resources';

class MainMenuScene extends Scene {
    onInitialize(engine) {
        super.onInitialize(engine);

        const background1 = new Background(Resources.TitleScreen.toSprite(), 640, 350, 1.05, 1.05);
        this.add(background1);

        const subLabel = new Label({
            text: 'Press Enter to start',
            pos: new Vector(500, 600),
            font: new Font({
                size: 40,
                family: 'sans-serif',
                color: Color.Red,
                bold: true
            })
        });

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
