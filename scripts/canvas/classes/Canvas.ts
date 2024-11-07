export class Canvas {
  public offScreenCanvas: OffscreenCanvas;
  static canvas: Canvas | undefined = undefined;
  public scale = 1;
  public offsetX = 0;
  public offsetY = 0;
  private constructor(public canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.offScreenCanvas.width = canvas.width;
      this.offScreenCanvas.height = canvas.height;
      this.drawCanvas();
    });

    canvas.addEventListener("wheel", (e: WheelEvent) => {
      e.preventDefault();
      const scaleAmount = 1.1;

      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      if (e.deltaY < 0) {
        this.scale *= scaleAmount;
      } else {
        this.scale /= scaleAmount;
      }

      this.offsetX = mouseX - (mouseX - this.offsetX) * scaleAmount;
      this.offsetY = mouseY - (mouseY - this.offsetY) * scaleAmount;
      this.drawCanvas();
      // this.get2dContext()?.translate(this.offsetX, this.offsetY);
    });

    this.offScreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
  }

  public static getCanvas(canvas: HTMLCanvasElement) {
    if (!Canvas.canvas) {
      Canvas.canvas = new Canvas(canvas);
    }

    return Canvas.canvas;
  }

  public static getExistingCanvas() {
    return Canvas.canvas;
  }
  get2dContext() {
    return this.canvas.getContext("2d");
  }

  getOffscreen2dContext() {
    return this.offScreenCanvas.getContext("2d");
  }

  drawCanvas() {
    this.get2dContext()?.reset();
    this.get2dContext()?.translate(this.offsetX, this.offsetY);
    // console.log(mouseX - this.offsetX, mouseY - this.offsetY);
    this.get2dContext()?.scale(this.scale, this.scale);
    this.get2dContext()?.drawImage(this.offScreenCanvas, 0, 0);
  }
}
