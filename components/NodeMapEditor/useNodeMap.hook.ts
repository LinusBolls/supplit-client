import { useEffect, useState } from "react";

import type { DotClickEventDetail, DotClickEvent } from "./Dot";
import type { Field, NodeData, NoodleData, NodeMapSchema } from "./types";

const makeIdGenerator = () => {
  let counter = 0;

  return () => {
    counter++;

    return counter.toString();
  };
};
const makeUniqueId = makeIdGenerator();

function makeSchema(
  inNode: NodeData,
  outNode: NodeData,
  bodyNodes: { [id: string]: NodeData },
  nodes: { [id: string]: NodeData },
  noodles: any
): NodeMapSchema {
  noodles = noodles.map((_: any) => []);

  for (const [nodeId, node] of Object.entries(nodes)) {
    for (const [portId, field] of node.fields.entries() as any) {
      for (const noodle of field.noodles) {
        noodles[noodle].push([nodeId, portId]);
      }
    }
  }
  return {
    in: {
      columns: inNode.fields.map((i) => i.name),
    },
    out: {
      columns: outNode.fields.map((i) => i.name),
    },
    nodes: Object.values(bodyNodes).map((i) => i.title),
    noodles,
  };
}

function useNodeMap() {
  const [nodes, setNodes] = useState<{ [id: string]: NodeData }>({
    in: {
      title: "loading",
      color: "orange",
      fields: [],
    },
    out: {
      title: "loading",
      color: "orange",
      fields: [],
    },
  });
  const [noodles, setNoodles] = useState<NoodleData[]>([]);
  const [activeDot, setActiveDot] = useState<DotClickEventDetail | null>(null);

  function getPortByAddress(address: [number, number]) {
    const [nodeId, portId] = address;

    const port = nodes[nodeId].fields[portId];

    return port;
  }

  function updatePort(address: [number, number], newEntry: Partial<Field>) {
    const [nodeId, portId] = address;

    // if (nodeId === 0) {
    //   setinNode((prev) => {
    //     prev.fields[portId] = { ...prev.fields[portId], ...newEntry };

    //     return prev;
    //   });
    //   return;
    // }
    // if (nodeId === 1) {
    //   setoutNode((prev) => {
    //     prev.fields[portId] = { ...prev.fields[portId], ...newEntry };

    //     return prev;
    //   });
    //   return;
    // }
    // setBodyNodes((prev) => {
    //   prev[nodeId - 2].fields[portId] = {
    //     ...prev[nodeId - 2].fields[portId],
    //     ...newEntry,
    //   };
    //   return prev;
    // });
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

      console.log("connecting", currentActiveDot.address, e.detail.address);

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
    makeUniqueId,
    calc: () => makeSchema(inNode, outNode, bodyNodes, nodes, noodles),
  };
}
export default useNodeMap;
