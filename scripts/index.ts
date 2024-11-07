import { drawGraph } from "./canvas/drawGraph.js";
import { Canvas } from "./canvas/classes/Canvas.js";
import { generateGraph } from "./data_structure/generateGraph.js";

const canvas = Canvas.getCanvas(
  document.getElementById("canvas") as HTMLCanvasElement
);

const init = async () => {
  await generateGraph(canvas, 5);

  drawGraph();
};
init();
