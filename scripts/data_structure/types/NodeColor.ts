export class NodeColor {
  constructor(
    public red: number = 255,
    public green: number = 255,
    public blue: number = 255
  ) {}

  public generateColorString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  public generateRandomColor() {
    this.red = Math.floor(Math.random() * 200);
    this.green = Math.floor(Math.random() * 200);
    this.blue = Math.floor(Math.random() * 200);
    return this;
  }
}
