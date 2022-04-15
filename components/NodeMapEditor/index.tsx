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
import useNodeMap, { makeUniqueId } from "./useNodeMap.hook";
import csvToFields from "./csvToFields";
import style from "./index.module.css";
import inputStyle from "../../styles/input.module.css";
import promptStyle from "../../styles/prompt.module.css";
import { Field } from "./types";
import { NodesProvider } from "./nodes.context";

const EXAMPLE_OUT = [
  ["EAN", "Price", "Vendor Specific Price"],
  ["9374930483909", "300$", "amogus master"],
];

function NodeMapEditor() {
  const [result, setResult] = useState<CsvInputState>(null);

  const { inNode, outNode, bodyNodes, nodes, setNodes, noodles, calc } =
    useNodeMap();

  useEffect(() => {
    if (result?.hasFiles) {
      setNodes((prev) => ({
        ...prev,
        in: {
          title: result.files[0].name,
          color: "orange",
          fields: csvToFields(
            result.files[0].papa.data as string[][],
            "output"
          ),
        },
      }));
    }
  }, [result]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      console.log("nodes:", nodes);

      setNodes((prev) =>
        update(prev, {
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
        fields: csvToFields(EXAMPLE_OUT, "input"),
      },
      [makeUniqueId()]: {
        title: "Validate EAN",
        color: "yellow",
        fields: {
          [makeUniqueId()]: {
            name: "EAN",
            type: "EAN",
            example: "9374930483909",
            facing: "output",
            ref: "" as any,
          },
          [makeUniqueId()]: {
            name: "EAN",
            type: "EAN",
            example: "9374930483909",
            facing: "input",
            ref: "" as any,
          },
        },
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

  const fields: { [id: string]: Field } = Object.values(nodes).reduce(
    (prev, node) => ({ ...prev, ...node.fields }),
    {}
  );

  return (
    <div className={style.nodeMapEditor} ref={dropRef}>
      <NodesProvider value={{ nodes, setNodes }}>
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
        <NodeBar nodeId={"in"} items={inNode.fields} />
        <NodeBar nodeId={"out"} items={outNode.fields} />

        {Object.entries(bodyNodes).map(([id, i]) => (
          <BodyNode
            key={id}
            nodeId={id}
            title={i.title}
            color={i.color}
            fields={i.fields}
          />
        ))}

        {noodles.map(({ startId, endId }, idx) => (
          <Noodle
            key={idx}
            startField={fields[startId]}
            endField={fields[endId]}
          />
        ))}
      </NodesProvider>
    </div>
  );
}
export default NodeMapEditor;
