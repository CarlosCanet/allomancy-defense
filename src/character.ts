import { GameObject } from "./gameObject";
export class Character extends GameObject {
    constructor(x: number, y: number, w: number, h: number, node: HTMLDivElement) {
        super(x, y, w, h, node);
    }
}
