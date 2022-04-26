import { useState } from "react";

import NodeRow from "./NodeRow";
import style from "./styles/index.module.css";
import type { Field } from "./types";

interface NodeBarProps {
  items: { [id: string]: Field };
  nodeId: string;
  isEditable: boolean;
  [key: string]: any;
}
function NodeBar({
  items,
  nodeId,
  className,
  isEditable,
  ...rest
}: NodeBarProps) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(null);

  return (
    <div
      className={
        style.nodeBar + " " + style["left" + "NodeBar"] + " " + className
      }
      {...rest}
    >
      {Object.entries(items).map(([fieldId, field], idx) => (
        <NodeRow
          key={idx}
          nodeId={nodeId}
          fieldId={fieldId}
          field={field}
          inheritedIsExpanded={idx === expandedRowIdx}
          inheritedSetIsExpanded={(v: boolean) => {
            setExpandedRowIdx(v ? idx : null);
          }}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
}
export default NodeBar;
export type { NodeBarProps };
