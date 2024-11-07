import { Graph } from "../../data_structure/types/Graph.js";
import { NodeColor } from "../../data_structure/types/NodeColor.js";
import { CanvasHelper } from "../CanvasHelper.js";
self.onmessage = (e) => {
    const off = new OffscreenCanvas(1000, 100);
    const context = off.getContext("2d");
    const nodes = Graph.getGraph().nodes;
    if (context) {
        let canvasHelper = CanvasHelper.getCanvasHelper(context);
        if (canvasHelper) {
            nodes.forEach((node) => {
                const color = new NodeColor(node.color.red, node.color.green, node.color.blue);
                // canvasHelper.drawCircle(10, node.center, color.generateColorString());
            });
        }
        context.beginPath();
        context.arc(100, 100, 100, 0, Math.PI);
        context.stroke();
    }
    off
        .convertToBlob()
        .then((blob) => createImageBitmap(blob))
        .then((data) => postMessage(data));
};
