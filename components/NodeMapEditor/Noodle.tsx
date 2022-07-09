import { useEffect, useState } from "react";

import type { Field } from "./types";
import style from "./styles/index.module.css";

interface NoodleProps {
  startField: Field;
  endField: Field;
}
function Noodle({ startField, endField }: NoodleProps) {
  const [pos, setPos] = useState<{
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
  }>({});

  const dot1 = startField.field.ref?.current?.getBoundingClientRect();
  const dot2 = endField.field.ref?.current?.getBoundingClientRect();

  if (!dot1 || !dot2) {
    console.error("noodle constructor: dots not found");
    return;
  }

  if (
    JSON.stringify({
      x1: dot1.left + dot1.width / 2,
      y1: dot1.top - dot1.height / 2,
      x2: dot2.left + dot2.width / 2,
      y2: dot2.top - dot2.height / 2,
    }) != JSON.stringify(pos)
  )
    setPos({
      x1: dot1.left + dot1.width / 2,
      y1: dot1.top - dot1.height / 2,
      x2: dot2.left + dot2.width / 2,
      y2: dot2.top - dot2.height / 2,
    });

  return pos == null ? null : (
    <svg
      className={style.noodle}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 0,
        top: "-2rem",
      }}
    >
      <line
        x1={pos.x1}
        y1={pos.y1}
        x2={pos.x2}
        y2={pos.y2}
        strokeWidth="8"
        stroke="white"
      />
    </svg>
  );
}
export default Noodle;
export type { NoodleProps };
