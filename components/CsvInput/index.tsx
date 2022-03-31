import { useState, useRef } from "react";
import Papa from "papaparse";

async function papaParse(source: any) {
  return await new Promise((resolve) =>
    Papa.parse(source, {
      complete: resolve,
    })
  );
}
async function errCheck(source: any) {
  const data = await papaParse(source);
}

function CsvInput({ ...rest }: any) {
  const [errs, setErrs] = useState<string[]>([]);

  const inputRef = useRef(null);

  return (
    <input
      ref={inputRef}
      type="file"
      accept=".csv"
      {...rest}
      className="bg-slate-900 px-12 py-4"
    />
  );
}
export default CsvInput;
