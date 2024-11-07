import { GraphNode } from "./Node.js";

export class Graph {
  public nodes: GraphNode[] = [];

  public static graph: Graph | undefined = undefined;

  private constructor() {}

  static getGraph() {
    if (!Graph.graph) {
      Graph.graph = new Graph();
    }

    return Graph.graph;
  }
}
