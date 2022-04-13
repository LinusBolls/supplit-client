import { useRef } from "react";
import type { RefObject } from "react";

import style from "./index.module.css";
import inputStyle from "../../styles/input.module.css";

interface DotProps {
  address: [number, number];
}
interface DotClickEventDetail {
  ref: RefObject<HTMLButtonElement>;
  address: [number, number];
}
type DotClickEvent = CustomEvent<DotClickEventDetail>;

function Dot({ address }: DotProps) {
  const dotRef = useRef<HTMLButtonElement>(null);

  const onClickHandler = (e: any) => {
    e.stopPropagation();

    const event: DotClickEvent = new CustomEvent("dotClick", {
      detail: { ref: dotRef, address },
    });
    window.dispatchEvent(event);
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
export type { DotProps, DotClickEventDetail, DotClickEvent };
