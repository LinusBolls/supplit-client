import type { RefObject } from "react";

import style from "./index.module.css";

interface InputProps {
  label: string;
  field: string;
  inputRef: RefObject<HTMLInputElement>;
  [key: string]: any;
}
function Input({ label, field, inputRef, ...rest }: InputProps) {
  const id = field + "-input";

  return (
    <div className={style.input} {...rest}>
      <input type="text" id={id} ref={inputRef} required />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
export default Input;
export type { InputProps };
