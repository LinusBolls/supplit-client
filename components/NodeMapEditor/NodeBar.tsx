import { useState } from "react";

import NodeRow from "./NodeRow";
import style from "./index.module.css";
import type { Field } from "./types";

interface NodeBarProps {
  type: "input" | "output";
  align: "left" | "right";
  items: Field[];
  nodeId: number;
}
function NodeBar({ type, align, items, nodeId }: NodeBarProps) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(null);

  return (
    <div className={style.nodeBar + " " + style[align + "NodeBar"]}>
      {items.map((field, idx) => (
        <NodeRow
          key={idx}
          address={[nodeId, idx]}
          type={type}
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
