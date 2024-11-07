import { Graph } from "../data_structure/types/Graph.js";
import { NodeColor } from "../data_structure/types/NodeColor.js";
import { CanvasHelper } from "./CanvasHelper.js";
import { Canvas } from "./classes/Canvas.js";
export function drawGraph() {
    var _a, _b;
    const graph = Graph.getGraph();
    const canvas = Canvas.getExistingCanvas();
    if (canvas) {
        const canvasHelper = CanvasHelper.getCanvasHelper(canvas.getOffscreen2dContext());
        if (canvasHelper) {
            graph.nodes.forEach((node) => {
                const color = new NodeColor(node.color.red, node.color.green, node.color.blue);
                canvasHelper.drawCircle(10, node.center, color.generateColorString());
            });
            drawEdges(canvasHelper, graph);
        }
        (_a = canvas.get2dContext()) === null || _a === void 0 ? void 0 : _a.translate(canvas.offsetX, canvas.offsetY);
        (_b = canvas
            .get2dContext()) === null || _b === void 0 ? void 0 : _b.drawImage(canvas.offScreenCanvas, 0, 0, canvas.canvas.width, canvas.canvas.height);
    }
}
function drawEdges(canvasHelper, graph) {
    graph.nodes.forEach((node) => {
        var _a;
        for (let i = 0; i < node.neighbours.length; i++) {
            const color = new NodeColor(node.color.red, node.color.green, node.color.blue);
            if (node.neighbours[i].node.neighbours.find((n) => n.node.name === node.name) &&
                ((_a = node.neighbours[i].node.neighbours.find((n) => n.node.name === node.name)) === null || _a === void 0 ? void 0 : _a.visited)) {
                canvasHelper.drawArc(node.center, node.neighbours[i].node.center, color.generateColorString(), node.neighbours[i].edge.toFixed(2) + "");
                continue;
            }
            canvasHelper.drawLine(node.center, node.neighbours[i].node.center, color.generateColorString(), node.neighbours[i].edge.toFixed(2) + "");
            node.neighbours[i].visited = true;
        }
    });
}
