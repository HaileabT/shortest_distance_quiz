export class NodeColor {
    constructor(red = 255, green = 255, blue = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    generateColorString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
    generateRandomColor() {
        this.red = Math.floor(Math.random() * 200);
        this.green = Math.floor(Math.random() * 200);
        this.blue = Math.floor(Math.random() * 200);
        return this;
    }
}
