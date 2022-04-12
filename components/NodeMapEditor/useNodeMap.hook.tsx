import { useEffect, useState } from "react";

import BodyNode from "./BodyNode";
import Noodle from "./Noodle";

import type { DotClickEventDetail } from "./Dot";
import type { NodeData, NoodleData, NodeMapSchema } from "./types";

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

  const [activeDot, setActiveDot] = useState<any>(null);

  const allNodes = [inNode, ...bodyNodes, outNode];
  const allPorts2d = allNodes.map((i: NodeData) => [...i.inputs, ...i.outputs]);
  const allPorts = [].concat.apply([], allPorts2d as any[]);
  console.log({ allPorts });

  function handleDotClick(e: any) {
    e.stopImmediatePropagation();

    const detail: DotClickEventDetail = e.detail;

    setActiveDot((currentActiveDot: any) => {
      if (!currentActiveDot) return detail;

      const newNoodle: NoodleData = {
        startRef: currentActiveDot.ref,
        endRef: detail.ref,
      };
      setNoodles((prev) => [...prev, newNoodle]);

      return null;
    });
  }

  useEffect(() => {
    window?.addEventListener("dotClick", handleDotClick, false);
  }, []);

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
    bodyNodeHtml: bodyNodes.map((i, idx) => (
      <BodyNode
        key={idx}
        title={i.title}
        color={i.color}
        inputs={i.inputs}
        outputs={i.outputs}
      />
    )),
    noodleHtml: noodles.map((i) => (
      <Noodle dotRef1={i.startRef} dotRef2={i.endRef} />
    )),
  };
}
export default useNodeMap;
