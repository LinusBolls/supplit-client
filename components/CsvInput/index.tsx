import { useEffect, useRef } from "react";
import Papa from "papaparse";

import type { ParseResult } from "papaparse";
import type { Dispatch, SetStateAction } from "react";

import style from "../../styles/input.module.css";

interface CsvInputFile {
  name: string;
  papa: ParseResult<unknown>;
}

interface CsvInputDataState {
  hasFiles: boolean;
  files: CsvInputFile[];
}
type CsvInputState = CsvInputDataState | null;
interface CsvInputProps {
  result: CsvInputState;
  setResult: Dispatch<SetStateAction<CsvInputState>>;
  [key: string]: any;
}
async function papaParse(source: any) {
  return await new Promise((resolve) =>
    Papa.parse(source, {
      complete: resolve,
    })
  );
}

function CsvInput({ result, setResult, ...rest }: CsvInputProps) {
  const inputRef = useRef<any>(null);

  async function handleChange(e: any) {
    e?.stopPropagation();

    const parsedFiles = Array.from(inputRef.current?.files)?.map(
      async (file: any) => {
        const name = file.name;
        const papa = await papaParse(file);

        return { name, papa };
      }
    );
    const sachen = (await Promise.all(parsedFiles)) as CsvInputFile[];

    setResult({ files: sachen, hasFiles: sachen.length > 0 });
  }
  useEffect(() => {
    inputRef.current?.addEventListener("change", handleChange);

    if (inputRef.current?.files?.length) handleChange(null);
  }, []);

  const defaultText = "Drag a .csv file here or click to upload";

  return (
    <label className={style.input + " " + style.medium + " " + style.dashed}>
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        style={{ display: "none" }}
        {...rest}
      />
      {inputRef.current?.files[0]?.name ?? defaultText}
    </label>
  );
}
export default CsvInput;
export type { CsvInputFile, CsvInputState, CsvInputProps };
