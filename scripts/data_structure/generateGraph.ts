import { drawGraph } from "../canvas/drawGraph.js";
import { Canvas } from "../canvas/classes/Canvas.js";
import { Coordinate } from "../canvas/utils/types/Coordinates.js";
import { AppWorker } from "../utils/types/AppWorker.js";
import { Graph } from "./types/Graph.js";
import { GraphCanvasDTO } from "./types/GraphWorkerDTO.js";
import { NeighboursWorkerDTO } from "./types/NeighboursWorkerDTO.js";
import { GraphNode, Neighbour } from "./types/Node.js";

export async function generateGraph(canvas: Canvas, nodeCount: number) {
  const graph: Graph = Graph.getGraph();
  const graphWorker: AppWorker = new AppWorker(
    new URL("./workers/graph.worker.js", import.meta.url),
    { type: "module" }
  );

  const dataForWorker: GraphCanvasDTO = {
    nodes: graph.nodes,
    nodeCount: nodeCount,
    canvasW: canvas.canvas.width,
    canvasH: canvas.canvas.height,
  };

  try {
    graph.nodes = await graphWorker.sendMessage<GraphCanvasDTO, GraphNode[]>(
      dataForWorker
    );
    await generateNeighbours(canvas);
  } catch (err) {
    console.log(err);
  }

  // drawGraph();
}

// for (let i = 0; i < nodeCount; i++) {
//   const coordinate: Coordinate = {
//     x: Math.floor(Math.random() * canvas.canvas.width),
//     y: Math.floor(Math.random() * canvas.canvas.height),
//   };

//   graph.nodes.push(new GraphNode(coordinate, `node-${i + 1}-${Date.now()}`));
// }

export async function generateNeighbours(canvas: Canvas) {
  const graph: Graph = Graph.getGraph();
  const neighbourWorker: AppWorker = new AppWorker(
    new URL("./workers/neighbour.worker.js", import.meta.url),
    {
      type: "module",
    }
  );

  // console.log(neighbourWorker)
  const neighbourWorkerData: NeighboursWorkerDTO = {
    nodes: graph.nodes,
    canvasW: canvas.canvas.width,
    nodesCount: graph.nodes.length,
  };

  graph.nodes = await neighbourWorker.sendMessage<
    NeighboursWorkerDTO,
    GraphNode[]
  >(neighbourWorkerData);
}
