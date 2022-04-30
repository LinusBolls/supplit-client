import type { RefObject } from "react";

import style from "./index.module.css";

interface SelectProps {
  label: string;
  field: string;
  inputRef: RefObject<HTMLSelectElement>;
  options: string[][];
  [key: string]: any;
}
function Select({ label, field, inputRef, options, ...rest }: SelectProps) {
  const id = field + "-select";

  return (
    <select id={id} ref={inputRef} className={style.input} {...rest}>
      {options.map(([value, name], idx) => (
        <option
          key={idx}
          value={value}
          style={{ color: "var(--text)", background: "var(--dark)" }}
        >
          {name}
        </option>
      ))}
    </select>
  );
}
export default Select;
export type { SelectProps };
