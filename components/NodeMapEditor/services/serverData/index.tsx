import { createContext } from "react";
import type { FunctionComponent } from "react";

import useServerData from "./useServerData.hook";
import type { UseServerDataValue } from "./useServerData.hook";

const ServerDataContext = createContext<UseServerDataValue | null>(null);
const ServerDataProvider = ServerDataContext.Provider;

const withServerDataContext = (Component: FunctionComponent) => () => {
  const value = useServerData();

  return (
    <ServerDataProvider value={value}>
      <Component />
    </ServerDataProvider>
  );
};
export default ServerDataContext;
export { withServerDataContext, ServerDataProvider };
