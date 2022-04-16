import { useState } from "react";

import MenuButton from "./MenuButton";

import style from "../styles/index.module.css";
import inputStyle from "../../../styles/input.module.css";

interface MenuOption {
  title: string;
  label: string;
  icon?: string;
  children?: MenuOption[];
  action?: () => void;
}
interface TopBarProps {
  children: any;
  menuTree: MenuOption[];
}
function TopBar({ children, menuTree }: TopBarProps) {
  const [expandedRowIdx, setExpandedRowIdx] = useState<number | null>(null);

  return (
    <div className={style.topBar}>
      {children}
      {menuTree.map((i, idx) => (
        <MenuButton
          key={idx}
          isHead={true}
          title={i.title}
          label={i.label}
          icon={i.icon}
          inheritedIsExpanded={idx === expandedRowIdx}
          inheritedSetIsExpanded={(v: boolean) => {
            setExpandedRowIdx(v ? idx : null);
          }}
          action={i.action}
          children={i.children}
        />
      ))}
    </div>
  );
}
export default TopBar;
export type { MenuOption, TopBarProps };
