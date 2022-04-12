import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

import TopBar from "./TopBar";
import NodeBar from "./NodeBar";
import CsvInput, { CsvInputState } from "../CsvInput";
import useNodeMap from "./useNodeMap.hook";
import csvToColumns from "./csvToColumns";
import style from "./index.module.css";
import inputStyle from "../../styles/input.module.css";
import promptStyle from "../../styles/prompt.module.css";

const EXAMPLE_OUT = [
  ["EAN", "Price", "Vendor Specific Price"],
  ["9374930483909", "300$", "amogus master"],
];

function NodeMapEditor() {
  const [result, setResult] = useState<CsvInputState>(null);

  const {
    inNode,
    setinNode,
    outNode,
    setoutNode,
    bodyNodeHtml,
    noodleHtml,
    setBodyNodes,
    calc,
  } = useNodeMap();

  useEffect(() => {
    if (result?.hasFiles) {
      setinNode({
        title: result.files[0].name,
        color: "orange",
        inputs: [],
        outputs: csvToColumns(result.files[0].papa.data as string[][]),
      });
    }
  }, [result]);

  useEffect(() => {
    setoutNode({
      title: "Ari Schema",
      color: "orange",
      inputs: csvToColumns(EXAMPLE_OUT),
      outputs: [],
    });

    setBodyNodes([
      {
        title: "Validate EAN",
        color: "yellow",
        inputs: [
          {
            name: "EAN",
            type: "EAN",
            example: "9374930483909",
          },
        ],
        outputs: [
          {
            name: "EAN",
            type: "EAN",
            example: "9374930483909",
          },
        ],
      },
    ]);
  }, []);

  async function sendSache() {
    if (!result?.hasFiles) return console.error("no csv file input found");

    const schema = calc();
    const csv = result.files[0].papa.data;

    console.log({ schema, csv });

    if (result.files[0].papa.errors)
      return console.error("error during csv file parsing");

    const res = await axios.post("http://localhost:8090/calc", {
      csv,
      schema,
    });
    return res.data;
  }

  if (!result)
    return (
      <div className={promptStyle.prompt}>
        <h1>Upload a file and start creating the schema</h1>
        <CsvInput result={result} setResult={setResult} />
      </div>
    );

  const submitButtonClassName =
    inputStyle.input +
    " " +
    inputStyle.button +
    " " +
    inputStyle.medium +
    " " +
    inputStyle.solid;

  return (
    <div className={style.nodeMapEditor}>
      <DndProvider backend={HTML5Backend}>
        <TopBar>
          <button onClick={sendSache} className={submitButtonClassName}>
            Ballern
          </button>
          {inNode.title + " to " + outNode.title}
          <button
            onClick={() => setResult(null)}
            className={submitButtonClassName}
          >
            Exit
          </button>
        </TopBar>
        <NodeBar type="output" align="left" items={inNode.outputs} />

        {bodyNodeHtml}
        {noodleHtml}

        <NodeBar type="input" align="right" items={outNode.inputs} />
      </DndProvider>
    </div>
  );
}
export default NodeMapEditor;
