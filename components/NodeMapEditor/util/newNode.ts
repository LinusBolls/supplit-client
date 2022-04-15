import type { NodeOption } from "../enums/nodes.enum";

function newNode(
  node: NodeOption,
  makeUniqueId: any,
  left: number,
  top: number
) {
  const { title, color, inFields, outFields } = node;

  const resolvedInFields = inFields.reduce(
    (prev, field) => ({
      ...prev,
      [makeUniqueId()]: {
        ...field,
        ref: null,
        facing: "input",
      },
    }),
    {}
  );
  const resolvedOutFields = outFields.reduce(
    (prev, field) => ({
      ...prev,
      [makeUniqueId()]: {
        ...field,
        ref: null,
        facing: "output",
      },
    }),
    {}
  );

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
