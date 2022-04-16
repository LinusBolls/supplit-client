import FieldEnum from "./fields.enum";
import type { FieldOption } from "./fields.enum";

interface WithName {
  name: string;
}
interface NodeOption {
  title: string;
  inFields: (FieldOption & WithName)[];
  outFields: (FieldOption & WithName)[];
  category: string;
}
const NodeEnum: { [key: string]: NodeOption } = {
  VALIDATE_EAN: {
    title: "Validate EAN",
    inFields: [{ ...FieldEnum.EAN, name: "EAN" }],
    outFields: [{ ...FieldEnum.EAN, name: "EAN" }],
    category: "VALIDATORS",
  },
  VALIDATE_PRICE: {
    title: "Validate Price",
    inFields: [{ ...FieldEnum.PRICE, name: "Price" }],
    outFields: [{ ...FieldEnum.PRICE, name: "Price" }],
    category: "VALIDATORS",
  },
  VALIDATE_PERCENTAGE: {
    title: "Validate Percentage",
    inFields: [{ ...FieldEnum.PERCENTAGE, name: "Percentage" }],
    outFields: [{ ...FieldEnum.PERCENTAGE, name: "Percentage" }],
    category: "VALIDATORS",
  },
  MULTIPLY: {
    title: "Multiply",
    inFields: [
      { ...FieldEnum.NUMBER, name: "Multiplier" },
      { ...FieldEnum.NUMBER, name: "Multiplier" },
    ],

    outFields: [{ ...FieldEnum.NUMBER, name: "Product" }],
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
