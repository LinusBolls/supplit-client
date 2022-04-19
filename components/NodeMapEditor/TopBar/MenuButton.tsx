import { useState } from "react";
import type { CSSProperties } from "react";

import inputStyle from "../../../styles/input.module.css";

const headButtonClassName =
  inputStyle.input + " " + inputStyle.square + " " + inputStyle.decent;

const subButtonClassName =
  inputStyle.input + " " + inputStyle.medium + " " + inputStyle.decent;

interface MenuButtonProps {
  isHead: boolean;
  children: any;
  title: string;
  label: string;
  icon?: string;
  action: any;
  inheritedIsExpanded: boolean;
  inheritedSetIsExpanded: (val: boolean) => void;
  [key: string]: any;
}
function MenuButton({
  isHead,
  children,
  title,
  label,
  icon,
  action,
  inheritedIsExpanded,
  inheritedSetIsExpanded,
  ...rest
}: MenuButtonProps) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(null);

  return (
    <div style={{ height: "4rem" }}>
      <button
        onClick={() => {
          if (children == null) action();
          else inheritedSetIsExpanded(!inheritedIsExpanded);
        }}
        style={
          {
            "--height": isHead ? "4rem" : "4rem",
          } as CSSProperties
        }
        title={title}
        className={
          (isHead ? headButtonClassName : subButtonClassName) +
          (inheritedIsExpanded ? " " + inputStyle.active : "")
        }
        {...rest}
      >
        {icon && <i className={icon} />}
        {label}
      </button>
      {inheritedIsExpanded && (
        <div
          style={{
            position: "relative",
            background: "var(--lessDark)",
            top: isHead ? "0" : "-4rem",
            left: isHead ? "0" : "100%",
          }}
        >
          {children.map((i: any, idx: number) => (
            <MenuButton
              key={idx}
              isHead={false}
              {...i}
              inheritedIsExpanded={idx === expandedRowIdx}
              inheritedSetIsExpanded={(v: boolean) => {
                setExpandedRowIdx(v ? idx : null);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default MenuButton;
