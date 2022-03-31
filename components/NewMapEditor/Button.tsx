import { useRef } from "react";

import button from "./css/button.module.css";

interface Props {
  icon: string;
  onClick: any;
  [key: string]: any;
}
function Button({ icon, onClick, ...rest }: Props) {
  return (
    <button className={button.button} onClick={onClick} {...rest}>
      <i className={icon} />
    </button>
  );
}
function Dot({ pos }: { pos: "in" | "out" }) {
  const dotRef = useRef(null);

  const clickHandler = (e: any) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("dotClick", { detail: dotRef }));
  };
  return (
    <Button
      icon="fas fa-circle"
      onClick={clickHandler}
      ref={dotRef}
      title="Connect Node"
      className={button.button + " " + button.dot + " " + button["dot--" + pos]}
    />
  );
}
export default Button;
export { Dot };
