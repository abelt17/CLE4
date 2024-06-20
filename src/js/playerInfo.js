import { Actor, Vector, Label, FontUnit, Font, Color, Scene } from "excalibur";
import { Resources } from './resources.js';
import { PlayerData, StaticPlayer } from "./player.js";

export class PlayerInfo extends Scene {
    onInitialize() {
        // Initialize player
        this.player = new StaticPlayer(300, 300);
        this.player.scale = new Vector(2, 2);
        this.add(this.player);

        // Create and add labels for player data
        this.healthLabel = new Label({
            text: `Health: ${PlayerData.health}`,
            pos: new Vector(50, 50),
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.healthLabel);

        this.xpLabel = new Label({
            text: `XP: ${PlayerData.xp}`,
            pos: new Vector(50, 100),
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.xpLabel);

        this.levelLabel = new Label({
            text: `Level: ${PlayerData.level}`,
            pos: new Vector(50, 150),
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.levelLabel);
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);

        // Update the labels with current player data
        this.healthLabel.text = `Health: ${PlayerData.health}`;
        this.levelLabel.text = `Level: ${PlayerData.level}`;
        this.xpLabel.text = `XP: ${PlayerData.xp}`;
    }
}
