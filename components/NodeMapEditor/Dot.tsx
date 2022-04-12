import { useRef } from "react";
import type { RefObject } from "react";

import style from "./index.module.css";
import inputStyle from "../../styles/input.module.css";

interface DotProps {}
interface DotClickEventDetail {
  ref: RefObject<HTMLButtonElement>;
}

function Dot({}: DotProps) {
  const dotRef = useRef<HTMLButtonElement>(null);

  const onClickHandler = (e: any) => {
    e.stopPropagation();
    console.log(
      dotRef.current?.parentElement?.parentElement?.parentElement?.parentElement
        ?.classList
    );
    window.dispatchEvent(
      new CustomEvent("dotClick", {
        detail: { ref: dotRef } as DotClickEventDetail,
      })
    );
  };
  return (
    <button
      className={
        style.dot +
        " " +
        inputStyle.input +
        " " +
        inputStyle.button +
        " " +
        inputStyle.square +
        " " +
        inputStyle.round
      }
      title="Connect Node"
      onClick={onClickHandler}
      ref={dotRef}
    >
      <div className={style.dot__child} />
    </button>
  );
}
export default Dot;
export type { DotProps, DotClickEventDetail };
