interface NodeMapError {
  severity: ErrorSeverity;
  source: "" | "Compiler" | "Api" | "Schema" | "Input Csv" | "Output Csv";
  desc: string;
}
interface ErrorSeverity {
  name: string;
  desc: string;
  icon: string;

  primColor: string;
  secColor: string;
}

const Err: { [key: string]: ErrorSeverity } = {
  FATAL: {
    name: "FATAL",
    desc: "Stops Execution",
    icon: "fas fa-skull",

    primColor: "#f15c6d",
    secColor: "#f15c6d",
  },
  WARN: {
    name: "WARN",
    desc: "Displays a Warning",
    icon: "fas fa-exlamation-triangle",
    primColor: "#ffbc38",
    secColor: "#ffbc38",
  },
  SILENT: {
    name: "SILENT",
    desc: "Terminates Current Noodle and Moves On",
    icon: "fas fa-check",
    primColor: "#01a884",
    secColor: "#01a884",
  },
};
export { Err };
export type { ErrorSeverity as ErrorOption, NodeMapError };
