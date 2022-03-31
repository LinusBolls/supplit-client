import { useState } from "react";

import style from "./index.module.css";
import NodeRow from "./NodeRow";

interface Props {
  type: "input" | "output";
  align: "left" | "right";
  items: string[];
}
function NodeBar({ type, align, items }: Props) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(null);

  return (
    <div className={style.nodeBar + " " + style[align + "NodeBar"]}>
      {items.map((i, idx) => (
        <NodeRow
          type={type}
          name={i}
          key={idx}
          isExpanded={idx === expandedRowIdx}
          setExpanded={(v: boolean) => setExpandedRowIdx(v ? idx : null)}
        />
      ))}
    </div>
  );
}
export default NodeBar;
