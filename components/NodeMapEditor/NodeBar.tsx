import { useState } from "react";

import NodeRow from "./NodeRow";
import style from "./index.module.css";
import type { Field } from "./types";

interface NodeBarProps {
  items: Field[];
  nodeId: number;
}
function NodeBar({ items, nodeId }: NodeBarProps) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(null);

  return (
    <div className={style.nodeBar + " " + style["left" + "NodeBar"]}>
      {items.map((field, idx) => (
        <NodeRow
          key={idx}
          address={[nodeId, idx]}
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
