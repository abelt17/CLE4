import { Actor, Vector, CollisionType, Timer, ParticleEmitter, Color } from "excalibur";

export class Boss extends Actor {
    constructor(sprite, x, y, width, height, identifier) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Passive, // Set collision type if needed
            width: width,
            height: height
        });
        this.graphics.use(sprite);
        this.identifier = identifier; // Add an identifier property
    }
}

export class Prof extends Actor {
    constructor(sprite, x, y, width, height, identifier) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Passive, // Set collision type if needed
            width: width,
            height: height
        });
        this.graphics.use(sprite);
        this.identifier = identifier; // Add an identifier property
    }

}

export class Enemy extends Actor {
    constructor(sprite, x, y, width, height, identifier) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Passive, // Set collision type if needed
            width: width,
            height: height
        });
        this.graphics.use(sprite);
        this.identifier = identifier; // Add an identifier property


        this.speed = 50; // Define the speed of the enemy
        this.direction = new Vector(0, 0); // Initialize direction vector

        // Set up a timer to change direction every 1-3 seconds
        this.changeDirectionTimer = new Timer({
            fcn: () => this.changeDirection(),
            interval: 1000 + Math.random() * 2000,
            repeats: true
        });
    }

    onInitialize(engine) {
        engine.add(this.changeDirectionTimer);
        this.changeDirectionTimer.start();
    }

    changeDirection() {
        // Generate a random direction
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        this.direction = new Vector(Math.cos(angle), Math.sin(angle)).scale(this.speed);
    }

    onPreUpdate(engine, delta) {
        this.vel = this.direction;
    }
}

export class StaticEnemy extends Actor {
    constructor(sprite, x, y, identifier, scene) {
        super({
            pos: new Vector(x, y),
        });
        this.graphics.use(sprite);
        this.identifier = identifier; // Add an identifier property
        // Set health based on the identifier
        if (identifier === "incinerose") {
            this.health = 200;
        } else if (identifier === "chomperdaisy") {
            this.health = 100;
        } else if(identifier === "thegnome") {
            this.health = 400;
        } else if(identifier === "sparringspar") {
            this.health = 500;
        } else if (identifier === "bazookerlilly") {
            this.health = 300;
        } else if (identifier === "sparringspar") {
            this.health = 600;
        } else if (identifier === "symphonyofroses") {
            this.health = 800
        } else if (identifier === "bmxbrainiac") {
            this.health = 500
        } else if (identifier === "petuninja") {
            this.health = 500;
        } else if (identifier === "ambushengage") {
            this.health = 700;
        } else if (identifier === "scarecrow") {
            this.health = 1000;
        } else if (identifier === "sparringsparsparringpartner") {
            this.health = 2000;
        }
        this.particleEmitter = this.createParticleEmitter(scene);
    }
    
    createParticleEmitter(scene) {
        const emitter = new ParticleEmitter({
            pos: new Vector(1000, 300),
            width: 5,
            height: 5,
            minVel: 50,
            maxVel: 100,
            minAngle: 0,
            maxAngle: 6.28, // 2 * Math.PI
            isEmitting: false,
            emitRate: 50,
            opacity: 0.6,
            fadeFlag: true,
            particleLife: 200,
            maxSize: 2,    // Increase maximum size to 20 pixels
            minSize: 1,    // Increase minimum size to 10 pixels
            startSize: 40,  // Initial size of particles
            endSize: 5,     // Final size of particles after fade out
            acceleration: new Vector(0, 0),
            beginColor: Color.Red,
            endColor: Color.DarkRed
        });
    
        // Add emitter to the scene
        if (scene) {
            scene.add(emitter);
        } else {
            console.warn("StaticEnemy: Scene reference not provided; emitter not added to scene.");
        }
        return emitter;
    }

    emitParticles() {
        this.particleEmitter.isEmitting = true;
        setTimeout(() => {
            this.particleEmitter.isEmitting = false;
        }, 400); // Emit particles for 200 milliseconds
    }


    attack(player) {
        const damage = Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
        player.takeDamage(damage);
    }

    shake() {
        const shakeDuration = 500; // Duration of the shake effect in milliseconds
        const shakeIntensity = 5; // Intensity of the shake effect
        const originalPos = this.pos.clone();

        const shakeInterval = setInterval(() => {
            const offsetX = Math.random() * shakeIntensity - shakeIntensity / 2;
            const offsetY = Math.random() * shakeIntensity - shakeIntensity / 2;
            this.pos = originalPos.add(new Vector(offsetX, offsetY));
        }, 50);

        setTimeout(() => {
            clearInterval(shakeInterval);
            this.pos = originalPos;
        }, shakeDuration);
    }

}