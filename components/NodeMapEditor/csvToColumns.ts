interface FieldOption {
  name: string;
  example: string;
  color: string;
  calc: (value: any) => boolean;
}
const Field: { [key: string]: FieldOption } = {
  STRING: {
    name: "String",
    example: "",
    color: "lime",
    calc: (_: any) => true,
  },
  NUMBER: {
    name: "Number",
    example: "",
    color: "red",
    calc: (value: any) => !isNaN(value),
  },
  PRICE: {
    name: "Price",
    example: "",
    color: "yellow",
    calc: (value: any) => ["$", "€"].includes(value[value.length - 1]),
  },
  EAN: {
    name: "EAN",
    example: "",
    color: "cyan",
    calc: (value: any) => !isNaN(value) && value.length === 13,
  },
  PERCENTAGE: {
    name: "Percentage",
    example: "",
    color: "blue",
    calc: (value: any) => value[value.length - 1] === "%",
  },
};
function getType(values: any[]) {
  if (!values.length) return Field.STRING;

  for (const field of Object.values(Field)) {
    if (field.calc(values)) return field;
  }
  return Field.String;
}
function invertCsv(content: any[][]) {
  if (!content.length) return [];

  return content[0].map((_, idx) => content.map((col) => col[idx]));
}
function csvToColumns(rawCsv: any[][]) {
  const invertedCsv = invertCsv(rawCsv);

  const dinge = invertedCsv.map(([columnName, ...values]) => ({
    name: columnName,
    type: getType(values).name,
    example: values.filter((i) => i !== "" && i != null)[0],
  }));
  return dinge;
}
export default csvToColumns;
export { Field, getType, invertCsv };
export type { FieldOption };
