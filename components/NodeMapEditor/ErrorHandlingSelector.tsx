interface ErrorOption {
  name: string;
  desc: string;
  icon: string;
}
const Err: { [key: string]: ErrorOption } = {
  FATAL: {
    name: "FATAL",
    desc: "Stops Execution",
    icon: "fas fa-skull",
  },
  WARN: {
    name: "WARN",
    desc: "Displays a Warning",
    icon: "fas fa-exlamation-triangle",
  },
  SILENT: {
    name: "SILENT",
    desc: "Terminates Current Noodle and Moves On",
    icon: "fas fa-info-square",
  },
};
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
export { Err };
export type { ErrorOption };
