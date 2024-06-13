import { Actor, Scene, Vector, Color, Label, Font, Keys } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Background } from "./background.js";

export class IntroScene extends Scene {
    onInitialize(engine) {
        this.background = new Background(Resources.BridgeHome.toSprite(), 750, 370, 0.4, 0.23);
        this.add(this.background);

        // Creates labels for each part of the story.
        const storyText = [
            "Under a bridge in Hefpark...",
            "",
            "You wake up in your cardboard box",
            "from someone poking you.",
            "Your open your eyes and see it's professor Acacia.",
            "",
            "Professor Acacia is a known Critter researcher",
            "but he isn't that great in combat, so his",
            "research is limited.",
            "",
            "The professor asks you to work for him",
            "as you don't have money and live in a cardboard box.",
            "You think about and decide to take him up on his offer",
            "as you want to better your life.",
            "The professor tells you to take your stuff and to",
            "come with him to his lab as he has a surprise for you",
            "for working for him.",
            "",
            "You follow him to his lab.",
            "",
            "Press ENTER to continue"
        ];

        storyText.forEach((text, index) => {
            const label = new Label({
                text: text,
                pos: new Vector(400, 200 + index * 50),
                font: new Font({
                    family: 'Arial',
                    size: 24,
                    color: Color.White
                })
            });

            this.add(label);
        });
    }

    update(engine, delta) {
        super.update(engine, delta);

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene('level1');
        }
    }
}