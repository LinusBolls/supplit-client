import { useDrag } from "react-dnd";

import NodeBar from "./NodeBar";
import ErrorHandlingSelector from "./ErrorHandlingSelector";
import useExpansion from "./useExpansion.hook";
import style from "./index.module.css";
import type { NodeData } from "./types";

function BodyNode({ title, color, inputs, outputs }: NodeData) {
  const { isExpanded, containerClassName, Button } = useExpansion({});

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "NODE",
      item: { text: "sache" },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <div
      style={{ position: "absolute", top: "5rem", left: "17rem", opacity }}
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
          <NodeBar type="output" align="right" items={outputs} />
          <NodeBar type="input" align="left" items={inputs} />
        </>
      )}
    </div>
  );
}
export default BodyNode;
