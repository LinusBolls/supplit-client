import { useEffect, useState } from "react";

import type { DotClickEventDetail, DotClickEvent } from "./Dot";
import type { Field, NodeData, NoodleData, NodeMapSchema } from "./types";

function makeSchema(
  inNode: string[],
  outNode: string[],
  bodyNodes: NodeData[],
  noodles: NoodleData[]
): NodeMapSchema {
  return {
    in: {
      columns: inNode,
    },
    out: {
      columns: outNode,
    },
    nodes: bodyNodes.map((i) => i.title),
    noodles: noodles.map((i) => [
      [0, 0],
      [0, 0],
    ]),
  };
}

function useNodeMap() {
  const [inNode, setinNode] = useState<NodeData>({
    title: "loading",
    color: "orange",
    inputs: [],
    outputs: [],
  });
  const [outNode, setoutNode] = useState<NodeData>({
    title: "loading",
    color: "orange",
    inputs: [],
    outputs: [],
  });
  const [bodyNodes, setBodyNodes] = useState<NodeData[]>([]);
  const [noodles, setNoodles] = useState<NoodleData[]>([]);

  const [activeDot, setActiveDot] = useState<DotClickEventDetail | null>(null);

  // const allNodes = [inNode, ...bodyNodes, outNode];
  // const allPorts2d = allNodes.map((i: NodeData) => [...i.inputs, ...i.outputs]);
  // const allPorts = [].concat.apply([], allPorts2d as any[]);

  function getPortByAddress(address: [number, number]) {
    const [nodeId, portId] = address;

    const allNodes = [inNode, outNode, ...bodyNodes];
    const node = allNodes[nodeId];

    const allPorts = [...node.inputs, ...node.outputs];
    const port = allPorts[portId];

    return port;
  }

  function updatePort(address: [number, number], newEntry: Field) {
    const [nodeId, portId] = address;

    if (nodeId === 0)
      setinNode((prev) => {
        prev.inputs[portId] = newEntry;

        return prev;
      });
    if (nodeId === 1) {
      setoutNode((prev) => {
        prev.inputs[portId] = newEntry;

        return prev;
      });
    }
    setBodyNodes((prev) => {
      prev[nodeId].inputs[portId] = newEntry;

      return prev;
    });
  }

  function handleDotClick(e: DotClickEvent) {
    e.stopImmediatePropagation();

    console.log("clicked on:", e.detail.address);

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

      console.log("connecting:", startPort, endPort);

      return null;
    });
  }

  useEffect(() => {
    window?.addEventListener("dotClick", handleDotClick as any, false);

    return () =>
      window?.removeEventListener("dotClick", handleDotClick as any, false);
  }, [bodyNodes]);

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

    calc: () =>
      makeSchema(
        inNode.outputs.map((i) => i.name),
        outNode.inputs.map((i) => i.name),
        bodyNodes,
        noodles
      ),
  };
}
export default useNodeMap;
