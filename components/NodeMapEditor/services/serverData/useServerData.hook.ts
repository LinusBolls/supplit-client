import { useEffect, useState } from "react";
import axios from "axios";

import { Err } from "../../Errors";
import FieldEnum from "../../enums/fields.enum";

import type { ErrorOption, NodeMapError } from "../../Errors";
import type { FieldOption } from "../../enums/fields.enum";
import type { NodeCategoryOption } from "../../enums/nodes.enum";

interface UseServerDataValue {
  severities: { [key: string]: ErrorOption };
  fields: { [key: string]: FieldOption };
  nodeCategories: {
    [key: string]: NodeCategoryOption;
  };

  fetchErrors: NodeMapError[];
}

const URL = "http://localhost:8090/api";

function useServerData(): UseServerDataValue {
  const [severities, setSeverities] = useState<{ [key: string]: ErrorOption }>(
    {}
  );
  const [fields, setFields] = useState<{ [key: string]: FieldOption }>({});
  const [nodeCategories, setNodeCategories] = useState<{
    [key: string]: NodeCategoryOption;
  }>({});

  const [fetchErrors, setFetchErrors] = useState<NodeMapError[]>([]);

  const handleErrs = (_: any) =>
    setFetchErrors([
      {
        severity: Err.FATAL,
        desc: "Failed to fetch data",
        source: "Api",
      },
    ]);

  useEffect(() => {
    (async () => {
      axios
        .get(`${URL}/data/severities`)
        .then((res) => setSeverities(res.data))
        .catch(handleErrs);
      axios
        .get(`${URL}/data/fields`)
        .then((res) => setFields(res.data))
        .catch(handleErrs);
      axios
        .get(`${URL}/data/nodecategories`)
        .then((res) => setNodeCategories(res.data))
        .catch(handleErrs);
    })();
  }, []);

  return { severities, fields, nodeCategories, fetchErrors };
}
export default useServerData;
export type { UseServerDataValue };
