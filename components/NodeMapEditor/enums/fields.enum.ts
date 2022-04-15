interface FieldOption {
  type: string;
  example: string;
  color: string;
  calc: (value: any) => boolean;
}
const FieldEnum: { [key: string]: FieldOption } = {
  PRICE: {
    type: "Price",
    example: "",
    color: "yellow",
    calc: (value: any) => ["$", "€"].includes(value[value.length - 1]),
  },
  PERCENTAGE: {
    type: "Percentage",
    example: "",
    color: "blue",
    calc: (value: any) => value[value.length - 1] === "%",
  },
  EAN: {
    type: "EAN",
    example: "0483968573659",
    color: "cyan",
    calc: (value: any) => !isNaN(value) && value.length === 13,
  },
  NUMBER: {
    type: "Number",
    example: "",
    color: "red",
    calc: (value: any) => !isNaN(value),
  },
  STRING: {
    type: "String",
    example: "",
    color: "lime",
    calc: (_: any) => true,
  },
};
export default FieldEnum;
export type { FieldOption };
