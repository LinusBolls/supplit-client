import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import style from "../styles/index.module.css";
import inputStyle from "../../../styles/input.module.css";

interface UseExpansionProps {
  inheritedIsExpanded?: boolean;
  inheritedSetIsExpanded?: Dispatch<SetStateAction<boolean>>;
}
interface UseExpansionValue {
  Button: any;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  containerClassName: string;
}

function useExpansion({
  inheritedIsExpanded,
  inheritedSetIsExpanded,
}: UseExpansionProps): UseExpansionValue {
  const [ownIsExpanded, ownSetIsExpanded] = useState(false);

  const isExpanded = inheritedIsExpanded ?? ownIsExpanded;
  const setIsExpanded = inheritedSetIsExpanded ?? ownSetIsExpanded;

  const Button = () => (
    <button
      className={
        inputStyle.input +
        " " +
        inputStyle.button +
        " " +
        inputStyle.square +
        " " +
        inputStyle.negative
      }
      title={isExpanded ? "Collapse Node" : "Expand Node"}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <i className="fas fa-bars" style={{ fontSize: "1rem" }} />
    </button>
  );
  const containerClassName =
    style["node__row__container"] +
    " " +
    style[isExpanded ? "node__row__container--expanded" : ""];

  return { Button, isExpanded, setIsExpanded, containerClassName };
}

export default useExpansion;
export type { UseExpansionProps, UseExpansionValue };
