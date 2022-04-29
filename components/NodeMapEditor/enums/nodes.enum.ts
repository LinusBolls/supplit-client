import FieldEnum from "./fields.enum";
import type { FieldOption } from "./fields.enum";

interface NodeOption {
  title: string;
  inFields: { field: FieldOption; name: string }[];
  outFields: { field: FieldOption; name: string }[];
  category: string;
}
const NodeEnum: { [key: string]: NodeOption } = {
  VALIDATE_EAN: {
    title: "Validate EAN",
    inFields: [{ field: FieldEnum.EAN, name: "EAN" }],
    outFields: [{ field: FieldEnum.EAN, name: "EAN" }],
    category: "VALIDATORS",
  },
  VALIDATE_PRICE: {
    title: "Validate Price",
    inFields: [{ field: FieldEnum.PRICE, name: "Price" }],
    outFields: [{ field: FieldEnum.PRICE, name: "Price" }],
    category: "VALIDATORS",
  },
  VALIDATE_PERCENTAGE: {
    title: "Validate Percentage",
    inFields: [{ field: FieldEnum.PERCENTAGE, name: "Percentage" }],
    outFields: [{ field: FieldEnum.PERCENTAGE, name: "Percentage" }],
    category: "VALIDATORS",
  },
  MULTIPLY: {
    title: "Multiply",
    inFields: [
      { field: FieldEnum.NUMBER, name: "Multiplier" },
      { field: FieldEnum.NUMBER, name: "Multiplier" },
    ],

    outFields: [{ field: FieldEnum.NUMBER, name: "Product" }],
    category: "CALCULATORS",
  },
};

interface NodeCategoryOption {
  title: string;
  color: string;
  nodes: NodeOption[];
}
const NodeCategoryEnum: { [key: string]: NodeCategoryOption } = {
  VALIDATORS: {
    title: "Validators",
    color: "yellow",
    nodes: Object.values(NodeEnum).filter((i) => i.category === "VALIDATORS"),
  },
  CALCULATORS: {
    title: "Calculators",
    color: "cyan",
    nodes: Object.values(NodeEnum).filter((i) => i.category === "CALCULATORS"),
  },
};
export default NodeEnum;
export { NodeCategoryEnum };
export type { NodeOption, NodeCategoryOption };
