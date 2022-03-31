import style from "./index.module.css"

function Input({ label, field }) {
  const id = field + "-input"

  return <div className={style.input}>
    <input type="text" required id={id}/>
    <label htmlFor={id}>{label}</label>
  </div>
}
export default Input