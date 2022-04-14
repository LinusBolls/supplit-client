import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import type { XYCoord } from "react-dnd";
import update from "immutability-helper";
import axios from "axios";

import TopBar from "./TopBar";
import NodeBar from "./NodeBar";
import BodyNode from "./BodyNode";
import Noodle from "./Noodle";
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
    outNode,
    bodyNodes,
    nodes,
    setNodes,
    noodles,
    calc,
    makeUniqueId,
  } = useNodeMap();

  useEffect(() => {
    if (result?.hasFiles) {
      setNodes((prev) => ({
        ...prev,
        in: {
          title: result.files[0].name,
          color: "orange",
          fields: csvToColumns(
            result.files[0].papa.data as string[][],
            "output"
          ),
        },
      }));
    }
  }, [result]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setNodes(
        update(nodes, {
          [id]: {
            $merge: { title: "ding" },
          },
        })
      );
    },
    [nodes, setNodes]
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: "NODE",
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);

        moveBox(item.id, left, top);
      },
    }),
    [moveBox]
  );

  useEffect(() => {
    setNodes((prev) => ({
      ...prev,
      out: {
        title: "Ari Schema",
        color: "orange",
        fields: csvToColumns(EXAMPLE_OUT, "input"),
      },
      [makeUniqueId()]: {
        title: "Validate EAN",
        color: "yellow",
        fields: [
          {
            name: "EAN",
            type: "EAN",
            example: "9374930483909",
            facing: "output",
            noodles: [],
          },
          {
            name: "EAN",
            type: "EAN",
            example: "9374930483909",
            facing: "input",
            noodles: [],
          },
        ],
      },
    }));
  }, []);

  async function sendSache() {
    if (!result?.hasFiles) return console.error("no csv file input found");

    const schema = calc();
    const csv = result.files[0].papa.data;

    console.log({ schema, csv });

    alert(JSON.stringify(schema.noodles, null, 2));

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
    <div className={style.nodeMapEditor} ref={dropRef}>
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
      <NodeBar nodeId={0} items={inNode.fields} />
      <NodeBar nodeId={1} items={outNode.fields} />

      {Object.entries(bodyNodes).map(([id, i], idx) => (
        <BodyNode
          key={id}
          nodeId={idx + 2}
          title={i.title}
          color={i.color}
          fields={i.fields}
        />
      ))}
      {noodles.map((i, idx) => (
        <Noodle key={idx} dotRef1={i.startRef} dotRef2={i.endRef} />
      ))}
    </div>
  );
}
export default NodeMapEditor;
