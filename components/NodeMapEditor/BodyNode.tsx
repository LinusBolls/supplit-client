import { useContext } from "react";
import type { RefObject } from "react";

import useDrag from "./hooks/useDrag.hook";

import NodeBar from "./NodeBar";
import ErrorHandlingSelector from "./ErrorHandlingSelector";
import useExpansion from "./hooks/useExpansion.hook";
import NodesContext from "./contexts/nodes.context";
import style from "./styles/index.module.css";
import inputStyle from "../../styles/input.module.css";
import type { NodeData } from "./types";

interface BodyNodeProps {
  nodeId: string;
}

function BodyNode({
  title,
  color,
  fields,
  nodeId,
  left,
  top,
}: NodeData & BodyNodeProps) {
  const { isExpanded, containerClassName, Button } = useExpansion({});
  const { dragRef, moveRef } = useDrag();
  const { setNodes } = useContext(NodesContext);

  function removeSelf() {
    setNodes((prev: any) => {
      delete prev[nodeId];
      return prev;
    });
  }

  return (
    <div
      ref={moveRef as RefObject<HTMLDivElement>}
      className={containerClassName + " " + style.node}
      style={{ background: "none" }}
    >
      <div
        className={
          style.node__header +
          " " +
          style[
            isExpanded ? "node__header--expanded" : "node__header--collapsed"
          ]
        }
        style={{ background: color }}
      >
        <Button />
        <span ref={dragRef as RefObject<HTMLDivElement>}>{title}</span>
        <ErrorHandlingSelector />
      </div>
      {isExpanded && (
        <>
          <div
            style={{
              padding: "0 1.5rem",
              display: "flex",
              flexDirection: "row-reverse",
              background: "var(--dark)",
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
          <NodeBar nodeId={nodeId} items={fields} isEditable={false} />
        </>
      )}
    </div>
  );
}
export default BodyNode;
