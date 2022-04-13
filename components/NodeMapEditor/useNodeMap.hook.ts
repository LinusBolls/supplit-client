import { useEffect, useState } from "react";

import type { DotClickEventDetail, DotClickEvent } from "./Dot";
import type { Field, NodeData, NoodleData, NodeMapSchema } from "./types";

function makeSchema(
  inNode: NodeData,
  outNode: NodeData,
  bodyNodes: NodeData[],
  noodles: any
): NodeMapSchema {
  const allNodes = [inNode, ...bodyNodes, outNode];

  const allFields = [].concat.apply(
    [],
    allNodes.map((i) => i.fields) as any[]
  ) as any;

  for (const [idx, _] of noodles.entries()) {
    const things = allFields.filter((i: any) => i.noodles.includes(idx));
  }
  return {
    in: {
      columns: inNode.fields.map((i) => i.name),
    },
    out: {
      columns: outNode.fields.map((i) => i.name),
    },
    nodes: bodyNodes.map((i) => i.title),
    noodles: [
      [
        [0, 0],
        [0, 0],
      ],
    ],
  };
}

function useNodeMap() {
  const [inNode, setinNode] = useState<NodeData>({
    title: "loading",
    color: "orange",
    fields: [],
  });
  const [outNode, setoutNode] = useState<NodeData>({
    title: "loading",
    color: "orange",
    fields: [],
  });
  const [bodyNodes, setBodyNodes] = useState<NodeData[]>([]);
  const [noodles, setNoodles] = useState<NoodleData[]>([]);

  const [activeDot, setActiveDot] = useState<DotClickEventDetail | null>(null);

  function getPortByAddress(address: [number, number]) {
    const [nodeId, portId] = address;

    const allNodes = [inNode, outNode, ...bodyNodes];
    const node = allNodes[nodeId];

    const port = node.fields[portId];

    return port;
  }

  function updatePort(address: [number, number], newEntry: Partial<Field>) {
    const [nodeId, portId] = address;

    console.log(nodeId);
    console.log([inNode, outNode, ...bodyNodes]);

    if (nodeId === 0) {
      setinNode((prev) => {
        console.log("inNode");

        prev.fields[portId] = { ...prev.fields[portId], ...newEntry };

        return prev;
      });
      return;
    }
    if (nodeId === 1) {
      setoutNode((prev) => {
        console.log("outNode");
        prev.fields[portId] = { ...prev.fields[portId], ...newEntry };

        return prev;
      });
      return;
    }
    setBodyNodes((prev) => {
      console.log("bodyNode");

      prev[nodeId - 2].fields[portId] = {
        ...prev[nodeId - 2].fields[portId],
        ...newEntry,
      };
      return prev;
    });
  }

  function handleDotClick(e: DotClickEvent) {
    e.stopImmediatePropagation();

    setActiveDot((currentActiveDot) => {
      if (!currentActiveDot) return e.detail;

      const newNoodle: NoodleData = {
        startRef: currentActiveDot.ref,
        endRef: e.detail.ref,
        startAddress: currentActiveDot.address,
        endAddress: e.detail.address,
      };
      setNoodles((prev) => [...prev, newNoodle]);

      const startPort = getPortByAddress(currentActiveDot.address);
      const endPort = getPortByAddress(e.detail.address);

      updatePort(currentActiveDot.address, {
        noodles: [noodles.length],
      });
      updatePort(e.detail.address, {
        noodles: [noodles.length],
      });
      return null;
    });
  }

  useEffect(() => {
    window?.addEventListener("dotClick", handleDotClick as any, false);

    return () =>
      window?.removeEventListener("dotClick", handleDotClick as any, false);
  }, [inNode, outNode, bodyNodes]);

  return {
    inNode,
    setinNode,
    outNode,
    setoutNode,
    bodyNodes,
    setBodyNodes,
    noodles,
    setNoodles,
    activeDot,
    setActiveDot,

    calc: () => makeSchema(inNode, outNode, bodyNodes, noodles),
  };
}
export default useNodeMap;
