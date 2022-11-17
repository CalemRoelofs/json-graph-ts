import test from "ava";
import { JsonGraph } from "./jsongraph.js";


test("Cannot add node with same label more than once", t => {
  const graph = new JsonGraph();
  const label = "label";

  const firstId = graph.addNode(label, { "type": "type" }).id;
  const secondId = graph.addNode(label, { "type": "type" }).id;

  t.deepEqual(firstId, secondId);
});

test("Cannot add edge with same source and target more than once", t => {
  const graph = new JsonGraph();

  const source = "source";
  const target = "target";

  const firstId = graph.addEdge(source, target);
  const secondId = graph.addEdge(source, target);

  t.deepEqual(firstId, secondId);
});

test("Can find all target nodes from source node's id", t => {
  const graph = new JsonGraph();

  const firstNodeId = graph.addNode("node_1", { "type": "type" }).id;
  const secondNodeId = graph.addNode("node_2", { "type": "type" }).id;
  const thirdNodeId = graph.addNode("node_3", { "type": "type" }).id;
  graph.addEdge(firstNodeId, secondNodeId);
  graph.addEdge(firstNodeId, thirdNodeId);

  const result = graph.findNodesByEdgeSource(firstNodeId);

  t.is(result.length, 2);

  const [firstNode, secondNode] = result;

  t.is(firstNode.id, secondNodeId);
  t.is(secondNode.id, thirdNodeId);
});

test("Can find all source nodes from target node's id", t => {
  const graph = new JsonGraph();

  const firstNodeId = graph.addNode("node_1", { "type": "type" }).id;
  const secondNodeId = graph.addNode("node_2", { "type": "type" }).id;
  const thirdNodeId = graph.addNode("node_3", { "type": "type" }).id;
  graph.addEdge(secondNodeId, firstNodeId);
  graph.addEdge(thirdNodeId, firstNodeId);

  const result = graph.findNodesByEdgeTarget(firstNodeId);

  t.is(result.length, 2);

  const [firstNode, secondNode] = result;

  t.is(firstNode.id, secondNodeId);
  t.is(secondNode.id, thirdNodeId);
});

test("Can create edges with relations", t => {
  const graph = new JsonGraph();
  const wrote = "wrote";

  const author = graph.addNode("Stephen King", { "type": "author" });
  const book = graph.addNode("The Shining", { "type": "book" });

  graph.addEdge(author.id, book.id, wrote);

  const results = graph.findNodesByRelation(wrote);
  const [source, relation, target] = results[0];

  t.assert(source.id === author.id);
  t.assert(relation === wrote);
  t.assert(target.id = book.id);
});

export default {};