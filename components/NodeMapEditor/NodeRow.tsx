import Dot from "./Dot";
import NodeInfo from "./NodeInfo";
import useExpansion from "./useExpansion.hook";
import style from "./index.module.css";
import type { Address, Field } from "./types";

interface NodeRowProps {
  nodeId: string;
  fieldId: string;
  field: Field;
  hasSeperator?: boolean;
  inheritedIsExpanded?: boolean;
  inheritedSetIsExpanded: any;
}
function NodeRow({
  nodeId,
  fieldId,
  field,
  hasSeperator = false,
  inheritedIsExpanded = false,
  inheritedSetIsExpanded,
}: NodeRowProps) {
  const { Button, isExpanded, containerClassName } = useExpansion({
    inheritedIsExpanded,
    inheritedSetIsExpanded,
  });

  const className =
    style.node__row +
    " " +
    style[field.facing === "input" ? "node__row--in" : "node__row--out"];

  return (
    <div className={containerClassName}>
      <div className={className}>
        <Dot nodeId={nodeId} fieldId={fieldId} />
        {field.name}
        {hasSeperator && <div className={style.borderEl} />}
        <Button />
      </div>
      {isExpanded && (
        <div className={style.node__row__info}>
          <NodeInfo field={field} />
        </div>
      )}
    </div>
  );
}
export default NodeRow;
export type { NodeRowProps };
