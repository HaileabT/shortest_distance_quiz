import { NodeColor } from "./NodeColor.js";
export class GraphNode {
    constructor(center, name) {
        this.center = center;
        this.name = name;
        this.neighbours = [];
        this.color = new NodeColor();
        this.color.generateRandomColor();
    }
}
export class Neighbour {
    constructor(node, edge, visited = false) {
        this.node = node;
        this.edge = edge;
        this.visited = visited;
    }
}
