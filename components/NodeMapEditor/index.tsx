import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import type { XYCoord } from "react-dnd";
import { Rnd } from "react-rnd";
import update from "immutability-helper";
import axios from "axios";

import TopBar, { MenuOption } from "./TopBar";
import NodeBar from "./NodeBar";
import BodyNode from "./BodyNode";
import Noodle from "./Noodle";
import CsvInput, { CsvInputState } from "../CsvInput";
import useNodeMap, { makeUniqueId } from "./hooks/useNodeMap.hook";
import csvToFields from "./util/csvToFields";
import style from "./styles/index.module.css";
import inputStyle from "../../styles/input.module.css";
import promptStyle from "../../styles/prompt.module.css";
import { Field } from "./types";
import { NodesProvider } from "./contexts/nodes.context";
import newNode from "./util/newNode";
import NodeEnum, { NodeCategoryEnum, NodeOption } from "./enums/nodes.enum";

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
          left: 0,
          top: 0,
        },
      }));
    }
  }, [result]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setNodes((prev) =>
        update(prev, {
          [id]: {
            $merge: { left, top },
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

        console.log(delta);

        const left = item.left + delta.x;
        const top = item.top + delta.y;

        moveBox(item.nodeId, left, top);
      },
    }),
    [moveBox]
  );

  function addNode(node: NodeOption) {
    setNodes((prev) => ({
      ...prev,
      ...newNode(node, makeUniqueId, 500, 100),
    }));
  }

  useEffect(() => {
    setNodes((prev) => ({
      ...prev,
      out: {
        title: "Ari Schema",
        color: "orange",
        fields: csvToFields(EXAMPLE_OUT, "input"),
        left: 0,
        top: 0,
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

  const submitButtonClassName =
    inputStyle.input +
    " " +
    inputStyle.button +
    " " +
    inputStyle.medium +
    " " +
    inputStyle.solid;

  const decentButtonClassName =
    inputStyle.input +
    " " +
    inputStyle.button +
    " " +
    inputStyle.medium +
    " " +
    inputStyle.decent;

  // const fields: { [id: string]: Field } = Object.fromEntries(
  //   Object.values(nodes).map((i) => Object.entries(i.fields))
  // );

  const fields: { [id: string]: Field } = Object.values(nodes).reduce(
    (prev, node) => ({ ...prev, ...node.fields }),
    {}
  );

  const menuTree: MenuOption[] = [
    {
      title: "Add Node",
      icon: "fas fa-plus",
      label: "",
      children: Object.values(NodeCategoryEnum).map((i) => ({
        title: i.title,
        label: i.title,
        children: i.nodes.map((j) => ({
          title: j.title,
          label: j.title,
          action: () => addNode(j),
        })),
      })),
    },
  ];

  if (!result)
    return (
      <div className={promptStyle.prompt}>
        <h1>Upload a file and start creating the schema</h1>
        <CsvInput result={result} setResult={setResult} />
      </div>
    );

  return (
    <div className={style.nodeMapEditor} ref={dropRef}>
      <NodesProvider value={{ nodes, setNodes }}>
        <TopBar menuTree={menuTree}>
          <button onClick={sendSache} className={submitButtonClassName}>
            Ballern
          </button>
          {inNode.title + " to " + outNode.title}
          <button
            onClick={() => {
              setResult(null);
              setNodes({
                in: {
                  title: "loading",
                  color: "orange",
                  fields: {},
                  left: 0,
                  top: 0,
                },
                out: {
                  title: "loading",
                  color: "orange",
                  fields: {},
                  left: 0,
                  top: 0,
                },
              });
            }}
            className={decentButtonClassName}
          >
            Exit
          </button>
        </TopBar>
        <NodeBar nodeId={"in"} items={inNode.fields} />
        <NodeBar nodeId={"out"} items={outNode.fields} />

        {/* <Rnd
          style={{ background: "red", minWidth: "10rem", maxWidth: "20rem" }}
          default={{
            x: 0,
            y: 0,
            width: 320,
            height: 200,
          }}
        >
          Rnd
        </Rnd> */}

        {noodles.map(({ startId, endId }, idx) => {
          const startField = fields[startId];
          const endField = fields[endId];
          return (
            <Noodle
              key={Math.random()}
              // key={idx}
              startField={fields[startId]}
              endField={fields[endId]}
            />
          );
        })}

        {Object.entries(bodyNodes).map(([id, i]) => (
          <BodyNode
            key={id}
            left={i.left}
            top={i.top}
            nodeId={id}
            title={i.title}
            color={i.color}
            fields={i.fields}
          />
        ))}
      </NodesProvider>
    </div>
  );
}
export default NodeMapEditor;
