import { Neighbour } from "../types/Node.js";
self.onmessage = (e) => {
    const { nodesCount, canvasW, nodes } = e.data;
    console.log(nodes);
    for (let i = 0; i < nodesCount; i++) {
        for (let j = 0; j < nodesCount; j++) {
            if (nodes[i].name === nodes[j].name)
                continue;
            let p = Math.random();
            if (p > 0.5 + 0.05 * i) {
                const edge = Math.random() * canvasW - 10;
                nodes[i].neighbours.push(new Neighbour(nodes[j], edge));
            }
        }
    }
    postMessage(nodes);
};
