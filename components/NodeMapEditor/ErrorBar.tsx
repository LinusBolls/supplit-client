import style from "./styles/index.module.css";
import inputStyle from "../../styles/input.module.css";
import fontStyle from "../../styles/font.module.css";

import { Err, NodeMapError } from "./Errors";

interface ErrorBarProps {
  errors: { [key: string]: NodeMapError };
}

function ErrorCard({ error }: { error: NodeMapError }) {
  const { severity, source, desc } = error;

  return (
    <div
      className={style.errorCard}
      style={{
        background: severity.primColor,
        border: `2px solid ${severity.secColor}`,
      }}
    >
      <div className={style.errorCard__topBar}>
        <div className={inputStyle.input + " " + inputStyle.square}>
          <i className={severity.icon} />
        </div>
        <div className={inputStyle.input + " " + inputStyle.square}>
          {source}
        </div>
      </div>
      <span style={{ padding: "0 1rem 0.5rem 1rem" }}>{desc}</span>
    </div>
  );
}

function ErrorBar({ errors }: ErrorBarProps) {
  const numErrors = Object.values(errors)?.length;

  return (
    <>
      <h2
        style={{
          color: "var(--white)",
        }}
        className={fontStyle.h2}
      >
        {numErrors + " Errors"}
      </h2>
      {numErrors ? (
        Object.entries(errors).map(([id, error]) => <ErrorCard error={error} />)
      ) : (
        <ErrorCard
          error={{
            severity: Err.SILENT,
            source: "",
            desc: "Everything is fine.",
          }}
        />
      )}
    </>
  );
}
export default ErrorBar;
export type { ErrorBarProps as InfoSidebarProps };

// Content-disposition: attachment; filename=fname.ext
