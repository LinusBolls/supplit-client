import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const NodesContext = createContext<UseNodeMapValue | null>(null);

const NodesProvider = NodesContext.Provider;

export default NodesContext;
export { NodesProvider };
