import { JsonGraphSchema, JsonGraphNode, JsonGraphEdge } from "./jsongraphschema";
import { randomUUID } from "crypto";

class JsonGraph {
  store: JsonGraphSchema;
  _nodeLabelIndex: string[] = [];

  constructor() {
    this.store = {
      graph: {
        nodes: [
        ],
        edges: []
      }
    };
  }

  addNode(label: string, metadata: { [k: string]: unknown; } | null): JsonGraphNode {
    if (this._nodeLabelIndex.includes(label)) return this.findNodesByLabel(label)[0];
    const node = {
      id: randomUUID(),
      label,
      metadata
    };

    this.store.graph?.nodes?.push(node);
    this._nodeLabelIndex.push(label);

    return node;
  }

  addEdge(sourceNodeId: string, targetNodeId: string, relation?: string): JsonGraphEdge {
    const matches = this.findEdgeBySourceAndTarget(sourceNodeId, targetNodeId, relation);
    if (matches.length > 0) return matches[0];

    const edge: JsonGraphEdge = {
      id: randomUUID(),
      source: sourceNodeId,
      target: targetNodeId
    };
    if (relation) edge.relation = relation;

    this.store.graph?.edges?.push(edge);

    return edge;
  }

  findEdgeBySourceAndTarget(source: string, target: string, relation?: string): JsonGraphEdge[] {
    return this.store.graph?.edges?.filter(edge => edge.source === source && edge.target === target && (relation ? edge.relation === relation : true)) || [];
  }

  findNodesByLabel(label: string): JsonGraphNode[] {
    return this.store.graph?.nodes?.filter(node => node.label === label) || [];
  }

  findNodesByEdgeSource(source: string): JsonGraphNode[] {
    const targets = this.store.graph?.edges?.filter(edge => edge.source === source)
      .map(edge => edge.target);

    return this.store.graph?.nodes?.filter(node => targets?.includes(node.id)) || [];
  }

  findNodesByEdgeTarget(target: string): JsonGraphNode[] {
    const sources = this.store.graph?.edges?.filter(edge => edge.target === target)
      .map(edge => edge.source);

    return this.store.graph?.nodes?.filter(node => sources?.includes(node.id)) || [];
  }

  findNodesByRelation(relation: string): [JsonGraphNode, string, JsonGraphNode][] {
    const related = this.store.graph?.edges?.filter(edge => edge.relation === relation);
    const sources = related?.map(edge => this.store.graph?.nodes?.filter((node) => edge.source === node.id)[0]);
    const targets = related?.map(edge => this.store.graph?.nodes?.filter((node) => edge.target === node.id)[0]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return sources?.map((source, i) => [source, relation, targets[i]]);
  }

  toString(spacer = null, indent = 2): string {
    return JSON.stringify(this.store, spacer, indent);
  }

}

export { JsonGraph }; 