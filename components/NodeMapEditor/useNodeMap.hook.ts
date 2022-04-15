import { useEffect, useState } from "react";

import type { DotClickEventDetail, DotClickEvent } from "./Dot";
import type {
  Address,
  FieldWithAddress,
  NodeData,
  NoodleData,
  NodeMapSchema,
} from "./types";

const makeIdGenerator = () => {
  let counter = 0;

  return () => {
    counter++;

    return counter.toString();
  };
};
const makeUniqueId = makeIdGenerator();

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

function useNodeMap() {
  const [nodes, setNodes] = useState<{ [id: string]: NodeData }>({
    in: {
      title: "loading",
      color: "orange",
      fields: {},
    },
    out: {
      title: "loading",
      color: "orange",
      fields: {},
    },
  });
  const [noodles, setNoodles] = useState<NoodleData[]>([]);
  const [activeDot, setActiveDot] = useState<DotClickEventDetail | null>(null);

  // if (typeof window !== undefined) {
  //   const storedNodes = localStorage.getItem("schema-nodes");
  //   const storedNoodles = localStorage.getItem("schema-noodles");
  // }

  function handleDotClick(e: DotClickEvent) {
    e.stopImmediatePropagation();

    setActiveDot((currentActiveDot) => {
      if (!currentActiveDot) return e.detail;

      const newNoodle: NoodleData = {
        startId: currentActiveDot.fieldId,
        endId: e.detail.fieldId,
      };
      setNoodles((prev) => [...prev, newNoodle]);

      return null;
    });
  }

  useEffect(() => {
    window?.addEventListener("dotClick", handleDotClick as any, false);

    return () =>
      window?.removeEventListener("dotClick", handleDotClick as any, false);
  }, [nodes, noodles]);

  const { in: inNode, out: outNode, ...bodyNodes } = nodes;

  return {
    inNode,
    outNode,
    bodyNodes,
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
export { makeUniqueId };
