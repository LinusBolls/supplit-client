import { useDrag } from "react-dnd";

import NodeBar from "./NodeBar";
import ErrorHandlingSelector from "./ErrorHandlingSelector";
import useExpansion from "./hooks/useExpansion.hook";
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

  const [{ isDragging, display }, dragRef] = useDrag(
    () => ({
      type: "NODE",
      item: { title, color, fields, nodeId, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        display: monitor.isDragging() ? "none" : "block",
      }),
    }),
    []
  );

  return (
    <div
      style={{
        left,
        top,
        display,
      }}
      ref={dragRef}
      className={containerClassName + " " + style.node}
    >
      <div className={style.node__header} style={{ background: color }}>
        <Button />
        {title}
        <ErrorHandlingSelector />
      </div>
      {isExpanded && (
        <>
          <NodeBar nodeId={nodeId} items={fields} />
        </>
      )}
    </div>
  );
}
export default BodyNode;
