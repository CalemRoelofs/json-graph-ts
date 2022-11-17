# JSON Graph TS

This is a small TypeScript library for working with [json-graph](https://github.com/jsongraph/json-graph-specification) objects in JavaScript/TypeScript.

## Features
- Add nodes and edges
- disables re-adding existing nodes and edges
- support for finding nodes according to source/target of edges

## Usage

```javascript
const { JsonGraph } = require("@kaylum.io/json-graph-ts")

const graph = new JsonGraph();

let author = graph.addNode("Stephen King", { "type": "author" })
let book = graph.addNode("The Shining", { "type": "book" })
graph.addEdge(a.id, b.id, "wrote")

console.log(graph.toString())
```