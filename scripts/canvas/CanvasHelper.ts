import { Coordinate } from "./utils/types/Coordinates.js";

export class CanvasHelper {
  static canvasHelper: CanvasHelper | null = null;
  private constructor(
    private ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ) {}

  drawCircle(
    radius: number,
    center: Coordinate,
    color?: string,
    options?: CanvasRenderingContext2DSettings
  ) {
    this.ctx.beginPath();
    if (color) this.ctx.fillStyle = color;
    this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawLine(
    from: Coordinate,
    to: Coordinate,
    color?: string,
    strokeText?: string,
    optons?: CanvasRenderingContext2DSettings
  ) {
    this.ctx.beginPath();
    if (color) this.ctx.strokeStyle = color;
    if (strokeText)
      this.ctx.strokeText(strokeText, (from.x + to.x) / 2, (from.y + to.y) / 2);
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }
  drawArc(
    from: Coordinate,
    to: Coordinate,
    color?: string,
    strokeText?: string,
    optons?: CanvasRenderingContext2DSettings
  ) {
    const cx = (from.x + to.x) / 5;
    const cy = Math.min(to.x, to.y) - 50;

    const t = 1 / 2;

    // Quadratic Bezier formula to get x and y along the curve
    const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cx + t * t * to.x;
    const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cy + t * t * to.y;

    this.ctx.beginPath();
    if (color) this.ctx.strokeStyle = color;
    this.ctx.moveTo(from.x, from.y);
    this.ctx.quadraticCurveTo(cx, cy, to.x, to.y);
    if (strokeText) this.ctx.strokeText(strokeText, x, y);
    this.ctx.stroke();
  }

  drawArrayHead(lineTip: Coordinate) {}

  static getCanvasHelper(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null
  ) {
    if (!ctx) return;
    if (!this.canvasHelper) {
      this.canvasHelper = new CanvasHelper(ctx);
    }

    return this.canvasHelper;
  }
}
