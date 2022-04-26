import { useContext } from "react";
import type { RefObject } from "react";

import useDrag from "./hooks/useDrag.hook";

import NodeBar from "./NodeBar";
import ErrorHandlingSelector from "./ErrorHandlingSelector";
import useExpansion from "./hooks/useExpansion.hook";
import NodesContext from "./contexts/nodes.context";
import style from "./styles/index.module.css";
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
    >
      <button onClick={removeSelf}>a</button>
      <div className={style.node__header} style={{ background: color }}>
        <Button />
        <span ref={dragRef as RefObject<HTMLDivElement>}>{title}</span>
        <ErrorHandlingSelector />
      </div>
      {isExpanded && (
        <>
          <NodeBar nodeId={nodeId} items={fields} isEditable={false} />
        </>
      )}
    </div>
  );
}
export default BodyNode;
