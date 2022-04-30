import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { DotClickEventDetail, DotClickEvent } from "../../Dot";
import type {
  Address,
  FieldWithAddress,
  NodeData,
  NoodleData,
  NodeMapSchema,
} from "../../types";

const makeIdGenerator = () => {
  let counter = 0;

  return () => {
    counter++;

    return counter.toString();
  };
};
const makeUniqueId = makeIdGenerator();

const toIdObject = <T>(arr: T[]): { [key: string]: T } => {
  if (!arr?.length) return {};
  return arr.reduce(
    (prev: any, i: any) => ({ ...prev, [makeUniqueId()]: i }),
    {}
  );
};

function addAddressesToFields(nodes: { [id: string]: NodeData }) {
  const nodesWithAddresses = Object.fromEntries(
    Object.entries(nodes).map(([nodeId, node], nodeIdx) => [
      nodeId,
      {
        ...node,
        fields: Object.fromEntries(
          Object.entries(node.fields).map(([fieldId, field], fieldIdx) => [
            fieldId,
            { ...field, address: [nodeIdx, fieldIdx] as Address },
          ])
        ),
      },
    ])
  );

  return nodesWithAddresses;
}

function makeSchema(
  inNode: NodeData,
  outNode: NodeData,
  bodyNodes: { [id: string]: NodeData },
  nodes: { [id: string]: NodeData },
  noodles: NoodleData[]
): NodeMapSchema {
  const nodesWithAddresses = addAddressesToFields(nodes);

  const fieldsWithAddresses: { [id: string]: FieldWithAddress } = Object.values(
    nodesWithAddresses
  ).reduce((prev, node) => ({ ...prev, ...node.fields }), {});

  const noodleValues: Address[][] = noodles.map(({ startId, endId }) => [
    fieldsWithAddresses[startId].address,
    fieldsWithAddresses[endId].address,
  ]);

  return {
    in: {
      columns: Object.values(inNode.fields).map((i) => i.name),
    },
    out: {
      columns: Object.values(outNode.fields).map((i) => i.name),
    },
    nodes: Object.values(bodyNodes).map((i) => i.title),
    noodles: noodleValues,
  };
}

interface UseNodeMapValue {
  isValidNoodle: (
    firstAddress: [string, string],
    secondAddress: [string, string]
  ) => boolean;
  inNode: NodeData;
  outNode: NodeData;
  bodyNodes: { [key: string]: NodeData };
  loadingNodes: { [key: string]: NodeData };
  nodes: { [key: string]: NodeData };
  setNodes: Dispatch<SetStateAction<{ [key: string]: NodeData }>>;
  noodles: NoodleData[];
  setNoodles: Dispatch<SetStateAction<NoodleData[]>>;
  activeDot: DotClickEventDetail | null;
  setActiveDot: Dispatch<SetStateAction<DotClickEventDetail | null>>;
  calc: () => NodeMapSchema;
}
function useNodeMap(): UseNodeMapValue {
  const loadingNodes = {
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
  };
  const [nodes, setNodes] = useState<{ [id: string]: NodeData }>(loadingNodes);
  const [noodles, setNoodles] = useState<NoodleData[]>([]);
  const [activeDot, setActiveDot] = useState<DotClickEventDetail | null>(null);

  // if (
  //   typeof window !== undefined &&
  //   typeof window?.localStorage !== undefined
  // ) {
  //   const storedNodes = window.localStorage.getItem("schema-nodes");
  //   const storedNoodles = window.localStorage.getItem("schema-noodles");
  //   const storedInCsv = window.localStorage.getItem("schema-in-csv");
  //   const storedOutCsv = window.localStorage.getItem("schema-out-csv");
  // }

  function handleDotLeftClick(e: DotClickEvent) {
    setActiveDot((currentActiveDot) => {
      if (!currentActiveDot) return e.detail;

      console.log("nodeId:", currentActiveDot.nodeId);
      console.log("fieldId:", currentActiveDot.fieldId);

      if (
        !isValidNoodle(
          [currentActiveDot.nodeId, currentActiveDot.fieldId],
          [e.detail.nodeId, e.detail.fieldId]
        )
      )
        return currentActiveDot;

      const newNoodle: NoodleData = {
        startId: currentActiveDot.fieldId,
        endId: e.detail.fieldId,
      };
      setNoodles((prev) => [...prev, newNoodle]);

      return null;
    });
  }
  function handleDotRightClick(e: DotClickEvent) {
    const indexesToBeRemoved: number[] = [];

    for (const [idx, noodle] of Object.entries(noodles)) {
      if (
        noodle.startId === e.detail.fieldId ||
        noodle.endId === e.detail.fieldId
      ) {
        indexesToBeRemoved.push(parseInt(idx));
      }
    }

    const newNoodles = noodles.filter(
      (_, idx) => !indexesToBeRemoved.includes(idx)
    );
    setNoodles(newNoodles);
  }

  useEffect(() => {
    window?.addEventListener("dotLeftClick", handleDotLeftClick as any, false);
    window?.addEventListener(
      "dotRightClick",
      handleDotRightClick as any,
      false
    );

    return () => {
      window?.removeEventListener(
        "dotLeftClick",
        handleDotLeftClick as any,
        false
      );
      window?.removeEventListener(
        "dotRightClick",
        handleDotRightClick as any,
        false
      );
    };
  }, [nodes, noodles]);

  const { in: inNode, out: outNode, ...bodyNodes } = nodes;

  function isValidNoodle(
    firstAddress: [string, string],
    secondAddress: [string, string]
  ) {
    if (
      firstAddress[0] == null ||
      firstAddress[1] == null ||
      secondAddress[0] == null ||
      secondAddress[1] == null
    )
      return false;

    const firstField = nodes[firstAddress[0]].fields[firstAddress[1]];
    const secondField = nodes[secondAddress[0]].fields[secondAddress[1]];

    if (firstAddress[0] === secondAddress[0]) return false;
    if (firstField.field.facing === secondField.field.facing) return false;
    const inputField =
      firstField.field.facing === "input" ? firstField : secondField;

    for (const noodle of noodles) {
      if (
        noodle.startId === firstField.field.id &&
        noodle.endId === secondField.field.id
      )
        return false;

      if (
        noodle.startId === secondField.field.id &&
        noodle.endId === firstField.field.id
      )
        return false;

      if (noodle.startId === inputField.field.id) return false;
      if (noodle.endId === inputField.field.id) return false;
    }
    return true;
  }
  return {
    isValidNoodle,
    inNode,
    outNode,
    bodyNodes,
    loadingNodes,
    nodes,
    setNodes,
    noodles,
    setNoodles,
    activeDot,
    setActiveDot,
    calc: () => makeSchema(inNode, outNode, bodyNodes, nodes, noodles),
  };
}
export default useNodeMap;
export { makeUniqueId, toIdObject };
export type { UseNodeMapValue };
