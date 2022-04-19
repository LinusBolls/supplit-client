import type { Field } from "./types";

interface NodeInfoProps {
  field: Field;
}
function NodeInfo({ field }: NodeInfoProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "1.5rem",
      }}
    >
      <span
        style={{
          color: "lime",
        }}
      >
        {field.type}
      </span>
      <span style={{ color: "var(--text)", fontSize: "0.5rem" }}>
        {field.example}
      </span>
    </div>
  );
}
export default NodeInfo;
export type { NodeInfoProps };
