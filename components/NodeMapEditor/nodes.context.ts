import { createContext } from "react";

import { NodeData } from "./types";

const NodesContext = createContext<{
  nodes: { [key: string]: NodeData } | null;
  setNodes: any;
}>({ nodes: null, setNodes: null });

const NodesProvider = NodesContext.Provider;

export default NodesContext;
export { NodesProvider };
