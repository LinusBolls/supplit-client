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
        height: "3rem",
      }}
    >
      <span
        style={{
          color: "lime",
        }}
      >
        {field.field.type}
      </span>
      <span style={{ color: "var(--text)", fontSize: "0.5rem" }}>
        {field.field.example}
      </span>
    </div>
  );
}
export default NodeInfo;
export type { NodeInfoProps };
