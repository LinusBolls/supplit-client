import { useDrag } from "react-dnd";

import NodeBar from "./NodeBar";
import ErrorHandlingSelector from "./ErrorHandlingSelector";
import useExpansion from "./useExpansion.hook";
import style from "./index.module.css";
import type { NodeData } from "./types";

interface BodyNodeProps {
  nodeId: number;
}

function BodyNode({ title, color, fields, nodeId }: NodeData & BodyNodeProps) {
  const { isExpanded, containerClassName, Button } = useExpansion({});

  const [{ isDragging, opacity }, dragRef] = useDrag(
    () => ({
      type: "NODE",
      item: { title, color, fields, nodeId },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <div
      style={{ position: "absolute", opacity }}
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
