import { useContext, useEffect, useRef } from "react";
import update from "immutability-helper";

import style from "./styles/index.module.css";
import inputStyle from "../../styles/input.module.css";
import NodesContext from "./services/schemaData";

import type { UseNodeMapValue } from "./services/schemaData/useSchemaData.hook";

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

  const { setNodes, activeDot, isValidNoodle } = useContext(
    NodesContext
  ) as UseNodeMapValue;

  useEffect(() => {
    setNodes((prev) =>
      update(prev, {
        [nodeId]: {
          fields: {
            [fieldId]: {
              field: {
                $merge: {
                  ref: buttonRef,
                },
              },
            },
          },
        },
      })
    );
  }, []);

  const leftClickHandler = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const event: DotClickEvent = new CustomEvent("dotLeftClick", {
      detail: { nodeId, fieldId },
    });
    window.dispatchEvent(event);
  };
  const rightClickHandler = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const event: DotClickEvent = new CustomEvent("dotRightClick", {
      detail: { nodeId, fieldId },
    });
    window.dispatchEvent(event);
  };

  const isActiveDot =
    activeDot?.nodeId === nodeId && activeDot?.fieldId === fieldId;

  const background = (function getColor() {
    if (isActiveDot) return "var(--action)";
    if (
      activeDot == null ||
      isValidNoodle(
        [activeDot?.nodeId as string, activeDot?.fieldId as string],
        [nodeId, fieldId]
      )
    )
      return "var(--white)";

    return "#999";
  })();

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
      onClick={leftClickHandler}
      onContextMenu={rightClickHandler}
      ref={buttonRef}
    >
      <div
        className={style.dot__child}
        style={{
          background,
        }}
      />
    </button>
  );
}
export default Dot;
export type { DotProps, DotClickEventDetail, DotClickEvent };
