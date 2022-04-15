import FieldEnum from "./fields.enum";
import type { FieldOption } from "./fields.enum";
import type { NodeData } from "../types";

interface NodeOption {
  title: string;
  color: string;
  inFields: FieldOption[];
  outFields: FieldOption[];
}

const NodeEnum: { [key: string]: NodeOption } = {
  VALIDATE_EAN: {
    title: "Validate EAN",
    color: "yellow",
    inFields: [FieldEnum.EAN],
    outFields: [FieldEnum.EAN],
  },
};
export default NodeEnum;
export type { NodeOption };
