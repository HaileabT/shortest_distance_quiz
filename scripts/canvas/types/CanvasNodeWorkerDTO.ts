import { GraphNode } from "../../data_structure/types/Node.js";
import { CanvasHelper } from "../CanvasHelper.js";

export interface CanvasNodeWorkerDTO {
  context: OffscreenCanvasRenderingContext2D | null;
  nodes: GraphNode[];
}
