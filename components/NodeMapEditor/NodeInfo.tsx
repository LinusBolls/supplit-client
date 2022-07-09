import type { Field } from "./types";

interface NodeInfoProps {
  field: Field;
  isHardCodeable: boolean;
}
function NodeInfo({ field, isHardCodeable }: NodeInfoProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "1.5rem",
        height: "3rem",
        position: "relative",
      }}
    >
      <span
        style={{
          color: "var(--action)",
        }}
      >
        {field.field.type}
      </span>
      <span style={{ color: "var(--text)", fontSize: "0.5rem" }}>
        {field.field.example}
      </span>
      {isHardCodeable && (
        <input
          type="text"
          placeholder="Hard Value"
          style={{
            padding: "0 0.5rem",
            width: "6rem",
            position: "absolute",
            top: "0.5rem",
            right: "1rem",
          }}
        />
      )}
    </div>
  );
}
export default NodeInfo;
export type { NodeInfoProps };
