import { useState } from "react";

import NodeRow from "./NodeRow";
import style from "./styles/index.module.css";
import type { Field } from "./types";

interface NodeBarProps {
  items: { [id: string]: Field };
  nodeId: string;
}
function NodeBar({ items, nodeId }: NodeBarProps) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(null);

  return (
    <div className={style.nodeBar + " " + style["left" + "NodeBar"]}>
      {Object.entries(items).map(([fieldId, field], idx) => (
        <NodeRow
          key={idx}
          nodeId={nodeId}
          fieldId={fieldId}
          field={field}
          inheritedIsExpanded={idx === expandedRowIdx}
          inheritedSetIsExpanded={(v: boolean) =>
            setExpandedRowIdx(v ? idx : null)
          }
        />
      ))}
    </div>
  );
}
export default NodeBar;
export type { NodeBarProps };
