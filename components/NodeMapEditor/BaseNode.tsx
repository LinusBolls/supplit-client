import { useState } from "react";
import { useDrag } from "react-dnd";

import style from "./index.module.css";
import NodeBar from "./NodeBar";

const Err = {
  FATAL: {
    name: "FATAL",
    desc: "Stops Execution",
    icon: "fas fa-skull",
  },
  WARN: {
    name: "WARN",
    desc: "Displays a Warning",
    icon: "fas fa-exlamation-triangle",
  },
  SILENT: {
    name: "SILENT",
    desc: "Terminates Current Noodle and Moves On",
    icon: "fas fa-info-square",
  },
};
interface Props {
  title: string;
  color: string;
  inputs: string[];
  outputs: string[];
}
function BaseNode({ title, color, inputs, outputs }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
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
    >
      <div className={style.node}>
        <div className={style.node__header} style={{ background: color }}>
          <button
            className={style.button}
            title={isExpanded ? "Shrink Node" : "Expand Node"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className="fas fa-bars" style={{ fontSize: "1rem" }} />
          </button>
          {title}
          <select title="Select Error Handling">
            {Object.values(Err).map((i) => (
              <option
                value={i.name}
                title={`${i.name} (${i.desc})`}
                key={i.name}
              >
                {i.name}
                {/* <i className={"sache " + i.icon} /> */}
              </option>
            ))}
          </select>
        </div>
        {isExpanded && (
          <>
            <NodeBar type="output" align="right" items={outputs} />
            <NodeBar type="input" align="left" items={inputs} />
          </>
        )}
      </div>
    </div>
  );
}
export default BaseNode;
