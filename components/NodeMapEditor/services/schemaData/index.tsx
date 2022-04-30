import { createContext } from "react";
import type { FunctionComponent } from "react";

import useSchemaData from "./useSchemaData.hook";
import type { UseNodeMapValue } from "./useSchemaData.hook";

const SchemaDataContext = createContext<UseNodeMapValue | null>(null);
const SchemaDataProvider = SchemaDataContext.Provider;

const withSchemaDataContext = (Component: FunctionComponent) => () => {
  const value = useSchemaData();

  return (
    <SchemaDataProvider value={value}>
      <Component />
    </SchemaDataProvider>
  );
};
export default SchemaDataContext;
export { withSchemaDataContext, SchemaDataProvider };
