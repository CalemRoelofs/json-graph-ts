export type JsonGraphSchema =
  {
    graph?: Graph;
    label?: string;
    type?: string;
    metadata?: {
      [k: string]: unknown;
    } | null;
    graphs?: Graph[];
  };

export interface Graph {
  label?: string;
  directed?: boolean | null;
  type?: string;
  metadata?: {
    [k: string]: unknown;
  } | null;
  nodes?:
  | JsonGraphNode[]
  | null;
  edges?:
  | JsonGraphEdge[]
  | null;
}

export interface JsonGraphNode {
  id: string;
  label?: string;
  metadata?: {
    [k: string]: unknown;
  } | null;
}

export interface JsonGraphEdge {
  id?: string;
  source: string;
  target: string;
  relation?: string;
  directed?: boolean | null;
  label?: string;
  metadata?: {
    [k: string]: unknown;
  } | null;
}