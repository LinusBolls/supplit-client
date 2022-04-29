import { makeUniqueId } from "../hooks/useNodeMap.hook";
import FieldEnum from "../enums/fields.enum";
import type { FieldOption } from "../enums/fields.enum";
import type { Field, Facing } from "../types";

function getType(values: any[]) {
  if (!values.length) return FieldEnum.STRING;

  for (const field of Object.values(FieldEnum)) {
    if (values.filter((i) => i != null).every(field.calc)) return field;
  }
  return FieldEnum.String;
}
function invertCsv(content: any[][]) {
  if (!content.length) return [];

  return content[0].map((_, idx) => content.map((col) => col[idx]));
}
function csvToColumns(invertedCsv: any[][], facing: Facing): Field[] {
  const dinge = invertedCsv.map(([columnName, ...values]) => ({
    name: columnName,
    field: {
      type: getType(values).type,
      example: values.filter((i) => i !== "" && i != null)[0],
      facing,
      ref: null,
      id: "",
    },
  }));
  return dinge;
}
function columnsToFields(columns: any[]) {
  const sache = columns.reduce(
    (prev, col) => ({ ...prev, [makeUniqueId()]: col }),
    {}
  );
  return sache;
}
function csvToFields(
  rawCsv: any[][],
  facing: Facing
): { [key: string]: Field } {
  const invertedCsv = invertCsv(rawCsv);
  const columns = csvToColumns(invertedCsv, facing);

  const fields = columnsToFields(columns);

  return fields;
}

export default csvToFields;
export { FieldEnum, getType, invertCsv, csvToColumns, columnsToFields };
export type { FieldOption };
