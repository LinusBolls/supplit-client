import { useEffect, useState } from "react";
import axios from "axios";

import TopBar, { MenuOption } from "./TopBar";
import NodeBar from "./NodeBar";
import BodyNode from "./BodyNode";
import Noodle from "./Noodle";
import CsvInput, { CsvInputState } from "../CsvInput";
import useNodeMap, { makeUniqueId, toIdObject } from "./hooks/useNodeMap.hook";
import csvToFields from "./util/csvToFields";
import style from "./styles/index.module.css";
import inputStyle from "../../styles/input.module.css";
import promptStyle from "../../styles/prompt.module.css";
import fontStyle from "../../styles/font.module.css";
import { Field } from "./types";
import { NodesProvider } from "./contexts/nodes.context";
import newNode from "./util/newNode";
import { NodeCategoryEnum, NodeOption } from "./enums/nodes.enum";
import ErrorBar from "./ErrorBar";
import { Err, NodeMapError } from "./Errors";
import NodeBarContainer from "./NodeBarContainer";

interface ParseResponse {
  errors: NodeMapError[];
  csv: string;
}

function NodeMapEditor() {
  const [csvInput, setCsvInput] = useState<CsvInputState>(null);
  const [csvOutput, setCsvOutput] = useState<CsvInputState>(null);
  const [parseResponse, setParseResponse] = useState<ParseResponse | null>(
    null
  );

  const {
    inNode,
    outNode,
    bodyNodes,
    loadingNodes,
    nodes,
    setNodes,
    noodles,
    calc,
  } = useNodeMap();

  useEffect(() => {
    if (csvInput?.hasFiles) {
      setNodes((prev) => ({
        ...prev,
        in: {
          title: csvInput.files[0].name,
          color: "orange",
          fields: csvToFields(
            csvInput.files[0].papa.data as string[][],
            "output"
          ),
          left: 0,
          top: 0,
        },
      }));
    } else {
      setCsvOutput(csvInput);
    }
  }, [csvInput]);

  useEffect(() => {
    if (csvOutput?.hasFiles) {
      setNodes((prev) => ({
        ...prev,
        out: {
          title: csvOutput.files[0].name,
          color: "orange",
          fields: csvToFields(
            csvOutput.files[0].papa.data as string[][],
            "input"
          ),
          left: 0,
          top: 0,
        },
      }));
    }
  }, [csvOutput]);

  function addNode(node: NodeOption) {
    setNodes((prev) => ({
      ...prev,
      ...newNode(node, makeUniqueId, 500, 100),
    }));
  }

  async function sendSache() {
    if (!csvInput?.hasFiles) return console.error("no csv file input found");

    const schema = calc();
    const csv = csvInput.files[0].raw;

    console.log("submitting:", { schema, csv });

    if (csvInput.files[0].papa.errors.length)
      return console.error("error during csv file parsing");

    try {
      const res = await axios.post("http://localhost:8090/calc", {
        csv,
        schema,
      });

      setParseResponse(res.data);
    } catch (err) {
      setParseResponse({
        csv: "",
        errors: [
          {
            severity: Err.FATAL,
            source: "Compiler",
            desc: `Failed to connect to api: ${(err as Error).message}`,
          },
        ],
      });
    }
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

  const noodlesHtml = noodles.map(({ startId, endId }, idx) => (
    <Noodle
      key={Math.random()}
      // key={idx}
      startField={fields[startId]}
      endField={fields[endId]}
    />
  ));
  const bodyNodesHtml = Object.entries(bodyNodes).map(([id, i]) => (
    <BodyNode
      key={id}
      left={i.left}
      top={i.top}
      nodeId={id}
      title={i.title}
      color={i.color}
      fields={i.fields}
    />
  ));

  if (!csvInput)
    return (
      <div className={promptStyle.prompt}>
        <h1>Upload a file and start creating the schema</h1>
        <CsvInput result={csvInput} setResult={setCsvInput} />
      </div>
    );

  return (
    <div className={style.nodeMapEditor}>
      <TopBar menuTree={menuTree}>
        <button onClick={sendSache} className={submitButtonClassName}>
          Ballern
        </button>
        <h2
          className={fontStyle.h2}
          style={{ color: "var(--white)", paddingLeft: "1rem" }}
        >
          {inNode.title + " to " + outNode.title}
        </h2>
        <button
          onClick={() => {
            setCsvInput(null);
            setCsvOutput(null);
            setNodes(loadingNodes);
          }}
          className={decentButtonClassName}
        >
          Exit
        </button>
      </TopBar>

      <div className={style.editor}>
        <NodesProvider value={{ nodes, setNodes }}>
          <NodeBarContainer
            nodeId="in"
            node={nodes.in}
            isEditable={true}
            facing="output"
            style={{ left: 0 }}
          />
          <NodeBarContainer
            nodeId="out"
            node={nodes.out}
            isEditable={true}
            facing="input"
            style={{ right: 0 }}
          />
          {noodlesHtml}
          {bodyNodesHtml}
        </NodesProvider>
      </div>

      <div className={style.infoSidebar}>
        <CsvInput result={csvInput} setResult={setCsvInput} />
        <CsvInput result={csvOutput} setResult={setCsvOutput} />
        <ErrorBar
          errors={{
            ...toIdObject(
              csvInput?.files[0]?.papa.errors.map(
                (error) =>
                  ({
                    severity: Err.WARN,
                    source: "Input Csv",
                    desc: error.message,
                  } as NodeMapError)
              )
            ),
            ...toIdObject(
              csvOutput?.files[0]?.papa.errors.map(
                (error) =>
                  ({
                    severity: Err.WARN,
                    source: "Output Csv",
                    desc: error.message,
                  } as NodeMapError)
              ) ?? []
            ),
            ...toIdObject(parseResponse?.errors ?? []),
          }}
        />
      </div>
    </div>
  );
}
export default NodeMapEditor;
