import { GraphNode } from "../types/Node.js";
self.onmessage = (e) => {
    const { nodes, nodeCount, canvasW, canvasH } = e.data;
    for (let i = 0; i < nodeCount; i++) {
        const coordinate = {
            x: Math.floor(Math.random() * canvasW),
            y: Math.floor(Math.random() * canvasH),
        };
        nodes.push(new GraphNode(coordinate, `node-${i + 1}-${Date.now()}`));
    }
    postMessage(nodes);
};
