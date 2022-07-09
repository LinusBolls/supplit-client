import type { NodeCategoryOption } from "../enums/nodes.enum";
import type { NodeOption } from "../enums/nodes.enum";
import type { Field, NodeData } from "../types";

function newNode(
  node: NodeOption,
  nodeCategory: NodeCategoryOption,
  makeUniqueId: any,
  left: number,
  top: number
): {
  [key: string]: NodeData;
} {
  const { title, inFields, outFields } = node;
  const { color } = nodeCategory;

  const resolvedInFields = inFields.reduce((prev, field) => {
    const newId = makeUniqueId();

    return {
      ...prev,
      [newId]: {
        name: field.name,
        field: {
          ...field.field,
          ref: null,
          facing: "input",
          id: newId,
        },
      } as Field,
    };
  }, {});
  const resolvedOutFields = outFields.reduce((prev, field) => {
    const newId = makeUniqueId();

    return {
      ...prev,
      [newId]: {
        name: field.name,
        field: {
          ...field.field,
          ref: null,
          facing: "output",
          id: newId,
        },
      } as Field,
    };
  }, {});

  const newNode = {
    title,
    color,
    left,
    top,
    fields: {
      ...resolvedInFields,
      ...resolvedOutFields,
    },
  };
  return { [makeUniqueId()]: newNode };
}
export default newNode;
