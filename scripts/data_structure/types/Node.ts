import { Coordinate } from "../../canvas/utils/types/Coordinates.js";
import { NodeColor } from "./NodeColor.js";

export class GraphNode {
  neighbours: Neighbour[] = [];
  color: NodeColor = new NodeColor();
  constructor(public center: Coordinate, public name: string) {
    this.color.generateRandomColor();
  }
}

export class Neighbour {
  constructor(
    public node: GraphNode,
    public edge: number,
    public visited: boolean = false
  ) {}
}
