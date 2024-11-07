var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppWorker } from "../utils/types/AppWorker.js";
import { Graph } from "./types/Graph.js";
export function generateGraph(canvas, nodeCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const graph = Graph.getGraph();
        const graphWorker = new AppWorker(new URL("./workers/graph.worker.js", import.meta.url), { type: "module" });
        const dataForWorker = {
            nodes: graph.nodes,
            nodeCount: nodeCount,
            canvasW: canvas.canvas.width,
            canvasH: canvas.canvas.height,
        };
        try {
            graph.nodes = yield graphWorker.sendMessage(dataForWorker);
            yield generateNeighbours(canvas);
        }
        catch (err) {
            console.log(err);
        }
        // drawGraph();
    });
}
// for (let i = 0; i < nodeCount; i++) {
//   const coordinate: Coordinate = {
//     x: Math.floor(Math.random() * canvas.canvas.width),
//     y: Math.floor(Math.random() * canvas.canvas.height),
//   };
//   graph.nodes.push(new GraphNode(coordinate, `node-${i + 1}-${Date.now()}`));
// }
export function generateNeighbours(canvas) {
    return __awaiter(this, void 0, void 0, function* () {
        const graph = Graph.getGraph();
        const neighbourWorker = new AppWorker(new URL("./workers/neighbour.worker.js", import.meta.url), {
            type: "module",
        });
        // console.log(neighbourWorker)
        const neighbourWorkerData = {
            nodes: graph.nodes,
            canvasW: canvas.canvas.width,
            nodesCount: graph.nodes.length,
        };
        graph.nodes = yield neighbourWorker.sendMessage(neighbourWorkerData);
    });
}
