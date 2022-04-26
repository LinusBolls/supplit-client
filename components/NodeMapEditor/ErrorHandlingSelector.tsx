import { Err } from "./Errors";

function ErrorHandlingSelector() {
  return (
    <select title="Select Error Handling">
      {Object.values(Err).map((i) => (
        <option value={i.name} title={`${i.name} (${i.desc})`} key={i.name}>
          {i.name}
          {/* <i className={"sache " + i.icon} /> */}
        </option>
      ))}
    </select>
  );
}
export default ErrorHandlingSelector;
