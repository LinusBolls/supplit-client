import { useEffect, useState } from "react";

import style from "./index.module.css";

function Noodle({ dotRef1, dotRef2 }: { dotRef1: any; dotRef2: any }) {
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

/* NodeMapEditor
  SVG?
  MenuBar
    MenuItem & DropdownMenuItem
    Validator
      WarningList
      Run Button
      LoadingBar
  Button & Dot
  ExpandingRow & Row
  Column
  BaseNode
    ErrHandlingSelect */

// BaseNode rounded like spotify and transform scale (0.9)

// types
//   string
//   number

//   ean
//   email
//   address
//   weight
//   length
//   area
//   volume
