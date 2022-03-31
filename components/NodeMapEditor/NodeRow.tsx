import { useRef, useState } from "react";

import style from "./index.module.css";
import Noodle from "./Noodle";

interface Props {
  type: "input" | "output";
  name: string;
  hasSeperator?: boolean;
  isExpanded?: boolean;
  setExpanded: any;
}
function NodeRow({
  type,
  name,
  hasSeperator = false,
  isExpanded = false,
  setExpanded,
}: Props) {
  const className =
    style.node__row +
    " " +
    style[type === "input" ? "node__row--in" : "node__row--out"];

  return (
    <div
      className={
        style["node__row__container"] +
        " " +
        (isExpanded ? style["node__row__container--expanded"] : "")
      }
    >
      <div className={className}>
        {name}
        {hasSeperator && <div className={style.borderEl} />}
        <button
          onClick={() => setExpanded(!isExpanded)}
          className={style.expandButton}
        >
          <i className="fas fa-bars" />
        </button>
        <Dot />
      </div>
      {isExpanded && <div className={style.node__row__info}></div>}
    </div>
  );
}
function Dot() {
  const dotRef = useRef(null);

  const handler = (e: any) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("dotClick", { detail: dotRef }));
  };
  return (
    <button
      className={style.dot}
      title="Connect Node"
      onClick={handler}
      ref={dotRef}
    >
      <div className={style.dot__child} />
    </button>
  );
}
export default NodeRow;
