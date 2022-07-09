import FieldEnum from "./fields.enum";
import type { FieldOption } from "./fields.enum";

interface NodeOption {
  title: string;
  inFields: { field: FieldOption; name: string }[];
  outFields: { field: FieldOption; name: string }[];
  category: string;
}
interface NodeCategoryOption {
  title: string;
  color: string;
  nodes: NodeOption[];
}
export type { NodeOption, NodeCategoryOption };
