import { GraphNode, Neighbour } from "./Node.js";

export interface NeighboursWorkerDTO {
  nodes: GraphNode[];
  nodesCount: number;
  canvasW: number;
}
