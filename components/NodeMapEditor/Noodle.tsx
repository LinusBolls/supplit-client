import { useEffect, useState } from "react";
import type { RefObject } from "react";

import style from "./index.module.css";

interface NoodleProps {
  dotRef1: RefObject<HTMLDivElement>;
  dotRef2: RefObject<HTMLDivElement>;
}
function Noodle({ dotRef1, dotRef2 }: NoodleProps) {
  const [pos, setPos] = useState<any>(null);

  useEffect(() => {
    const dot1 = dotRef1.current?.getBoundingClientRect();
    const dot2 = dotRef2.current?.getBoundingClientRect();

    if (!dot1 || !dot2) {
      console.log("noodle constructor: dots not found");
      return;
    }

    setPos({
      x1: dot1.left + dot1.width / 2,
      y1: dot1.top - dot1.height / 2 - 16,
      x2: dot2.left + dot2.width / 2,
      y2: dot2.top - dot2.height / 2 - 16,
    });
  }, []);

  return pos == null ? null : (
    <svg
      className={style.noodle}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "0",
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