import { useContext } from "react";
import update from "immutability-helper";

import Dot from "./Dot";
import NodeInfo from "./NodeInfo";
import useExpansion from "./hooks/useExpansion.hook";
import inputStyle from "../../styles/input.module.css";
import style from "./styles/index.module.css";
import type { Field } from "./types";
import NodesContext from "./contexts/nodes.context";

interface NodeRowProps {
  nodeId: string;
  fieldId: string;
  field: Field;
  hasSeperator?: boolean;
  inheritedIsExpanded?: boolean;
  inheritedSetIsExpanded?: (v: boolean) => void;
  isEditable: boolean;
}
function NodeRow({
  nodeId,
  fieldId,
  field,
  hasSeperator = false,
  inheritedIsExpanded = false,
  inheritedSetIsExpanded,
  isEditable,
}: NodeRowProps) {
  const { Button, isExpanded, containerClassName } = useExpansion({
    inheritedIsExpanded,
    inheritedSetIsExpanded,
  });
  const { setNodes } = useContext(NodesContext);

  const className =
    style.node__row +
    " " +
    style[field.field.facing === "input" ? "node__row--in" : "node__row--out"];

  function removeSelf() {
    setNodes((prev: any) => {
      delete prev[nodeId].fields[fieldId];

      return prev;
    });
  }
  return (
    <div className={containerClassName}>
      <div className={className}>
        <Dot nodeId={nodeId} fieldId={fieldId} />
        {field.name}
        {hasSeperator && <div className={style.borderEl} />}
        <Button />
      </div>
      {isExpanded && (
        <>
          {isEditable && (
            <div
              style={{
                padding: "0 1.5rem",
                display: "flex",
                flexDirection: "row-reverse",
                height: "3rem",
              }}
            >
              <button
                onClick={removeSelf}
                className={
                  inputStyle.input +
                  " " +
                  inputStyle.button +
                  " " +
                  inputStyle.square
                }
                style={{ color: "var(--text)" }}
                title="Remove Node"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          )}

          <NodeInfo field={field} />
        </>
      )}
    </div>
  );
}
export default NodeRow;
export type { NodeRowProps };
