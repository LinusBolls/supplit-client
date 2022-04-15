import { useContext, useEffect, useRef } from "react";
import update from "immutability-helper";

import style from "./index.module.css";
import inputStyle from "../../styles/input.module.css";
import NodesContext from "./nodes.context";

interface DotProps {
  nodeId: string;
  fieldId: string;
}
interface DotClickEventDetail {
  nodeId: string;
  fieldId: string;
}
type DotClickEvent = CustomEvent<DotClickEventDetail>;

function Dot({ nodeId, fieldId }: DotProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { setNodes } = useContext(NodesContext);

  useEffect(() => {
    setNodes((prev: any) =>
      update(prev, {
        [nodeId]: {
          fields: {
            [fieldId]: {
              $merge: {
                ref: buttonRef,
              },
            },
          },
        },
      })
    );
  }, []);

  const onClickHandler = (e: any) => {
    e.stopPropagation();

    const event: DotClickEvent = new CustomEvent("dotClick", {
      detail: { nodeId, fieldId },
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
      ref={buttonRef}
    >
      <div className={style.dot__child} />
    </button>
  );
}
export default Dot;
export type { DotProps, DotClickEventDetail, DotClickEvent };
