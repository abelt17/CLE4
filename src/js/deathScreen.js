import { Scene, Color, Label, TextAlign, Engine, Keys, Vector, Font, EasingFunctions } from 'excalibur';
import { PlayerData } from './player.js';

export class DeathScreen extends Scene {
    constructor(engine) {
        super(engine);

        // Create a red background
        this.backgroundColor = Color.Red.clone();
        this.labels = [];

        const deathText = [
            "You died, press ENTER to respawn."
        ];

        // Create a label for the death message
        deathText.forEach((text, index) => {
            const deathLabel = new Label({
                text: text,
                // textAlign: TextAlign.Center,
                pos: new Vector(80, 320),
                font: new Font({
                    family: 'Arial',
                    size: 70,
                    color: Color.White
                })
            });

            this.labels.push(deathLabel);
            this.add(deathLabel);
        });

        // Create the fade-out actor
        // this.fadeOutActor = new Actor({
        //     pos: new Vector(640, 360),
        //     width: 1280,
        //     height: 720,
        //     color: Color.Black,
        //     opacity: 0
        // });
        // this.add(this.fadeOutActor);
    }

    onPreUpdate(engine) {
        // Listen for Enter key press to respawn
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Enter) {
                this.respawnPlayer();
            }
        });
    }

    // update(engine) {
    //     super.update(engine);
    //     if (engine.input.keyboard.wasPressed(Keys.Enter)) {
    //         this.fadeOutActor.actions.fade(1, 1000, EasingFunctions.EaseInOutCubic).callMethod(() => {
    //             engine.goToScene('selectScene');
    //         });
    //     }
    // }

    respawnPlayer() {
        // Reset player's health to its previous value
        PlayerData.health = PlayerData.previousHealth;

        // Go back to the game scene (replace 'GameScene' with your actual game scene class)
        this.engine.goToScene('level1');
    }
}
