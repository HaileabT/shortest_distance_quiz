export class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.offScreenCanvas.width = canvas.width;
            this.offScreenCanvas.height = canvas.height;
            this.drawCanvas();
        });
        canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const scaleAmount = 1.1;
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            if (e.deltaY < 0) {
                this.scale *= scaleAmount;
            }
            else {
                this.scale /= scaleAmount;
            }
            this.offsetX = mouseX - (mouseX - this.offsetX) * scaleAmount;
            this.offsetY = mouseY - (mouseY - this.offsetY) * scaleAmount;
            this.drawCanvas();
            // this.get2dContext()?.translate(this.offsetX, this.offsetY);
        });
        this.offScreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    }
    static getCanvas(canvas) {
        if (!Canvas.canvas) {
            Canvas.canvas = new Canvas(canvas);
        }
        return Canvas.canvas;
    }
    static getExistingCanvas() {
        return Canvas.canvas;
    }
    get2dContext() {
        return this.canvas.getContext("2d");
    }
    getOffscreen2dContext() {
        return this.offScreenCanvas.getContext("2d");
    }
    drawCanvas() {
        var _a, _b, _c, _d;
        (_a = this.get2dContext()) === null || _a === void 0 ? void 0 : _a.reset();
        (_b = this.get2dContext()) === null || _b === void 0 ? void 0 : _b.translate(this.offsetX, this.offsetY);
        // console.log(mouseX - this.offsetX, mouseY - this.offsetY);
        (_c = this.get2dContext()) === null || _c === void 0 ? void 0 : _c.scale(this.scale, this.scale);
        (_d = this.get2dContext()) === null || _d === void 0 ? void 0 : _d.drawImage(this.offScreenCanvas, 0, 0);
    }
}
Canvas.canvas = undefined;
