import style from "./index.module.css";

function TopBar({ children }: any) {
  return <div className={style.topBar}>{children}</div>;
}
export default TopBar;
