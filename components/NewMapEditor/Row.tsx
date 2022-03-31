import style from "./css/index.module.css";
import Button, { Dot } from "./Button";
import Column from "./Column";

interface Props {
  children: any;
  align?: "start" | "end" | "spaceBetween";
  inDot?: boolean;
  outDot?: boolean;
  isExpanded?: boolean;
  setExpanded?: any;
  [key: string]: any;
}
interface ExpandableProps {
  HeadEl: any;
  children: any;
  isExpanded?: boolean;
  setExpanded?: any;
  [key: string]: any;
}
function Row({
  align = "spaceBetween",
  Slot0 = false,
  Slot1 = false,
  Slot2 = false,
  inDot = false,
  outDot = false,
  ...rest
}: any) {
  return (
    <div className={style.row} style={{ justifyContent: align }} {...rest}>
      {Slot0 && Slot0}
      {Slot1 && Slot1}
      {Slot2 && Slot2}
      {inDot && <Dot pos="in" />}
      {outDot && <Dot pos="out" />}
    </div>
  );
}
function ExpandingRow({
  HeadEl,
  children,
  isExpanded = false,
  setExpanded = (v: boolean) => null,
  ...rest
}: ExpandableProps) {
  const NewHeadEl = {
    ...HeadEl,
    props: {
      ...HeadEl.props,
      Slot2: (
        <Button
          onClick={() => setExpanded(!isExpanded)}
          title={isExpanded ? "Minimize" : "Expand"}
          icon="fa fa-square"
        />
      ),
    },
  };
  return (
    <div
      className={
        style.expandingRow +
        " " +
        (isExpanded ? style["expandingRow--expanded"] : "")
      }
      {...rest}
    >
      {NewHeadEl}
      {children}
    </div>
  );
}
export { Row, ExpandingRow };

interface BaseNodeProps {
  title: string;
  color: string;
  inputs: string[];
  outputs: string[];
  [key: string]: any;
}
// function BaseNode({ title, color, inputs, outputs }: BaseNodeProps) {
//   return (
//     <ExpandingRow HeadEl={<Row style={{ background: color }}>{title}</Row>}>
//       <Column items={inputs} align="left" type="input" />
//       <Column items={outputs} align="right" type="output" />
//     </ExpandingRow>
//   );
// }

const shortenTo = (length: number, str: string) =>
  str.length < length ? str : str.slice(length - 3) + "...";

// shortenTo(20, title)
