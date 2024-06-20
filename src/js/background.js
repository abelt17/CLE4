import { Actor, Vector, Color } from "excalibur";

export class Background extends Actor {
    constructor(sprite, x, y, xg, yg) {
        super({
            pos: new Vector(x, y),
            scale: new Vector(xg, yg),
        });
        this.graphics.use(sprite);
    }

    // onPostDraw(ctx, delta) {
    //     super.onPostDraw(ctx, delta);

    //     // Set border properties
    //     const borderWidth = 5;
    //     const borderColor = Color.White.toString(); // Border color

    //     // Get the position and dimensions of the background
    //     const x = this.pos.x - (this.width * this.scale.x) / 2;
    //     const y = this.pos.y - (this.height * this.scale.y) / 2;
    //     const width = this.width * this.scale.x;
    //     const height = this.height * this.scale.y;

    //     // Draw the border
    //     ctx.strokeStyle = borderColor;
    //     ctx.lineWidth = borderWidth;
    //     ctx.strokeRect(x, y, width, height);
    // }
}
