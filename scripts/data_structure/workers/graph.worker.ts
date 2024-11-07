import { Coordinate } from "../../canvas/utils/types/Coordinates.js";
import { GraphCanvasDTO } from "../types/GraphWorkerDTO.js";
import { GraphNode } from "../types/Node.js";

self.onmessage = (e: MessageEvent<GraphCanvasDTO>) => {
  const { nodes, nodeCount, canvasW, canvasH } = e.data;
  for (let i = 0; i < nodeCount; i++) {
    const coordinate: Coordinate = {
      x: Math.floor(Math.random() * canvasW),
      y: Math.floor(Math.random() * canvasH),
    };

    nodes.push(new GraphNode(coordinate, `node-${i + 1}-${Date.now()}`));
  }
  postMessage(nodes);
};
