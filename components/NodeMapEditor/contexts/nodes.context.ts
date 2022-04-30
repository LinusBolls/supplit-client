import { createContext } from "react";

import type { UseNodeMapValue } from "../hooks/useNodeMap.hook";

const NodesContext = createContext<UseNodeMapValue | null>(null);

const NodesProvider = NodesContext.Provider;

export default NodesContext;
export { NodesProvider };
