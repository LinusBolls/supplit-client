import { useContext } from "react";

import style from "./styles/index.module.css";
import inputStyle from "../../styles/input.module.css";
import fontStyle from "../../styles/font.module.css";

import { NodeMapError } from "./Errors";

import ServerDataContext from "./services/serverData";

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

  const val = useContext(ServerDataContext);

  if (val == null) return;

  const { severities } = val;

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
            severity: severities.SILENT,
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
