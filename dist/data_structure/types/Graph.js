export class Graph {
    constructor() {
        this.nodes = [];
    }
    static getGraph() {
        if (!Graph.graph) {
            Graph.graph = new Graph();
        }
        return Graph.graph;
    }
}
Graph.graph = undefined;
