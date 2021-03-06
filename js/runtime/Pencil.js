import { Director } from '../Director.js';
import { Sprite } from "../base/Sprite.js";

// 铅笔基类
export class Pencil extends Sprite {
    constructor(image, top) {
        super(image,
            0, 0,
            image.width, image.height,
            window.innerWidth, 0,
            image.width, image.height)
        this.pencilSpeed = Director.getInstance().moveSpeed;
        this.top = top
    }

    draw() {
        this.x = this.x - this.pencilSpeed;
        super.draw(this.img,
            0, 0,
            this.width,
            this.height,
            this.x, this.y,
            this.width, this.height)
    }
}
