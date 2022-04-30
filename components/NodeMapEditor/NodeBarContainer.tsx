import { useContext, useRef } from "react";
import update from "immutability-helper";

import NodeBar from "./NodeBar";
import FieldEnum from "./enums/fields.enum";
import {
  makeUniqueId,
  UseNodeMapValue,
} from "./services/schemaData/useSchemaData.hook";

import type { NodeData, Field, Facing } from "./types";

import style from "./styles/index.module.css";
import inputStyle from "../../styles/input.module.css";

import NodesContext from "./services/schemaData";
import Input from "../Input";
import Select from "../Select";

interface NodeBarContainerProps {
  node: NodeData;
  nodeId: string;
  isEditable: boolean;
  facing: Facing;
  [key: string]: any;
}
function NodeBarContainer({
  node,
  nodeId,
  isEditable,
  facing,
  ...rest
}: NodeBarContainerProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const typeInputRef = useRef<HTMLSelectElement>(null);

  const { setNodes } = useContext(NodesContext) as UseNodeMapValue;

  function onSubmit(e: any) {
    e.preventDefault();

    const name = nameInputRef.current?.value;
    const typeName = typeInputRef.current?.value;

    if (!name || !typeName) return;

    const type = FieldEnum[typeName];

    const newId = makeUniqueId();

    const newField: Field = {
      name,
      field: {
        type: type.type,
        example: type.example,
        facing,
        ref: null,
        id: newId,
      },
    };

    setNodes((prev: any) =>
      update(prev, {
        [nodeId]: {
          fields: {
            $merge: {
              [newId]: newField,
            },
          },
        },
      })
    );
  }
  return (
    <div className={style.nodeBarContainer} {...rest}>
      <NodeBar
        isEditable={isEditable}
        nodeId={nodeId}
        items={node.fields}
        className={style.inNodeBar}
      />
      <form
        onSubmit={onSubmit}
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Input
          label="Field Name"
          field={nodeId + "-fieldName"}
          inputRef={nameInputRef}
          style={{ marginBottom: "1rem" }}
        />
        <Select
          label="Field Type"
          field={nodeId + "-fieldType"}
          inputRef={typeInputRef}
          options={Object.keys(FieldEnum).map((i) => [i, i])}
          style={{ marginBottom: "1rem" }}
        />
        {/* <hr
          style={{
            background: "var(--text)",
            width: "calc(100% - 2rem)",
            height: "2px",
            margin: "1rem 0",
            border: "none",
          }}
        /> */}
        <button
          className={
            inputStyle.button +
            " " +
            inputStyle.medium +
            " " +
            inputStyle.bordered +
            " " +
            inputStyle.input
          }
          type="submit"
        >
          <i className="fas fa-plus" />
        </button>
      </form>
    </div>
  );
}
export default NodeBarContainer;
export type { NodeBarContainerProps };
