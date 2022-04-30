import type { FunctionComponent } from "react";

import useNodeMap from "../hooks/useNodeMap.hook";
import { NodesProvider } from "../contexts/nodes.context";

const withNodeMapContext = (Component: FunctionComponent) => () => {
  const value = useNodeMap();

  return (
    <NodesProvider value={value}>
      <Component />
    </NodesProvider>
  );
};
export default withNodeMapContext;
