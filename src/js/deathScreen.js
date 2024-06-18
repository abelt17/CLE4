import { Scene, Color, Label, TextAlign, Engine, Keys, Vector } from 'excalibur';
import { PlayerData } from './player.js';

export class DeathScreen extends Scene {
    constructor(engine) {
        super(engine);

        // Create a red background
        this.backgroundColor = Color.Red.clone();

        // Create a label for the death message
        const deathLabel = new Label({
            text: 'You died, press Enter to respawn',
            fontColor: Color.White,
            fontSize: 72,
            // textAlign: TextAlign.Center,
            pos: new Vector(500, 300)
        });
        this.add(deathLabel);

    }

    onPreUpdate(engine) {
        // Listen for Enter key press to respawn
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Enter) {
                this.respawnPlayer();
            }
        });
    }

    respawnPlayer() {
        // Reset player's health to its previous value
        PlayerData.health = PlayerData.previousHealth;

        // Go back to the game scene (replace 'GameScene' with your actual game scene class)
        this.engine.goToScene('level1');
    }
}
