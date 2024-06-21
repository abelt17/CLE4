import { Actor, Vector, Label, FontUnit, Font, Color, Scene, Keys } from "excalibur";
import { Resources } from './resources.js';
import { PlayerData, StaticPlayer, previousScene } from "./player.js";
import { Background } from "./background.js";

export class PlayerInfo extends Scene {
    onInitialize() {
        // Initialize player
        this.background = new Background(Resources.PlayerInfoBG.toSprite(), 650, 350, 1.4, 1.2);
        this.add(this.background);

        // this.player = new StaticPlayer(400, 300);
        // this.player.scale = new Vector(2, 2);
        // this.add(this.player);

        // Create and add labels for player data
        this.healthLabel = new Label({
            text: `Health: ${PlayerData.health}`,
            pos: new Vector(800, 250),
            font: new Font({
                family: 'Trebuchet MS',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        });

        this.xpLabel = new Label({
            text: `XP: ${PlayerData.xp}`,
            pos: new Vector(800, 300),
            font: new Font({
                family: 'Trebuchet MS',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        });

        this.levelLabel = new Label({
            text: `Level: ${PlayerData.level}`,
            pos: new Vector(800, 200),
            font: new Font({
                family: 'Trebuchet MS',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        });

        this.add(this.levelLabel);
        this.add(this.healthLabel);
        this.add(this.xpLabel);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        // Update the labels with current player data
        this.levelLabel.text = `Level: ${PlayerData.level}`;
        this.healthLabel.text = `Health: ${PlayerData.health}/${PlayerData.maxHealth}`;
        this.xpLabel.text = `XP: ${PlayerData.xp}/${PlayerData.xpThreshold}`;

        if (engine.input.keyboard.wasPressed(Keys.ControlLeft) || engine.input.keyboard.wasPressed(Keys.ControlRight)) {
            engine.goToScene(previousScene.scene);
        }

    }
}
