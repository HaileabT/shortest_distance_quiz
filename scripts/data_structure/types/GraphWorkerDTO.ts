import { GraphNode } from "./Node.js";

export interface GraphCanvasDTO {
  nodes: GraphNode[];
  nodeCount: number;
  canvasW: number;
  canvasH: number;
}
