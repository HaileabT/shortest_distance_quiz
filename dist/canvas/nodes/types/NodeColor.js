export class NodeColor {
    constructor(red = 255, green = 255, blue = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    generateColorString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}
