import { makeUniqueId } from "./useNodeMap.hook";
import { Field, Facing } from "./types";

interface FieldOption {
  name: string;
  example: string;
  color: string;
  calc: (value: any) => boolean;
}
const FieldEnum: { [key: string]: FieldOption } = {
  PRICE: {
    name: "Price",
    example: "",
    color: "yellow",
    calc: (value: any) => ["$", "€"].includes(value[value.length - 1]),
  },
  PERCENTAGE: {
    name: "Percentage",
    example: "",
    color: "blue",
    calc: (value: any) => value[value.length - 1] === "%",
  },
  EAN: {
    name: "EAN",
    example: "",
    color: "cyan",
    calc: (value: any) => !isNaN(value) && value.length === 13,
  },
  NUMBER: {
    name: "Number",
    example: "",
    color: "red",
    calc: (value: any) => !isNaN(value),
  },
  STRING: {
    name: "String",
    example: "",
    color: "lime",
    calc: (_: any) => true,
  },
};
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
function csvToColumns(invertedCsv: any[][], facing: Facing) {
  const dinge = invertedCsv.map(([columnName, ...values]) => ({
    name: columnName,
    type: getType(values).name,
    example: values.filter((i) => i !== "" && i != null)[0],
    noodles: [],
    facing,
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
