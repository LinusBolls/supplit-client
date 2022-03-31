import { useState } from "react";

import style from "./css/index.module.css";

interface Props {
  children: any;
}
function Column({ children }: Props) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(1);

  const addNewProps = (i: any, idx: number) => ({
    ...i,
    isExpanded: idx === expandedRowIdx,
    setExpanded: (v: boolean) => setExpandedRowIdx(v ? idx : null),
  });
  return <div className={style.column}>{children.map(addNewProps)}</div>;
}
export default Column;
