import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import style from "./index.module.css";
import TopBar from "./TopBar";
import BaseNode from "./BaseNode";
import NodeBar from "./NodeBar";
import Noodle from "./Noodle";

function NodeMapEditor() {
  const inItems = [
    "EAN",
    "Price",
    "Discount",
    "EClass",
    "Tax",
    "Country of Origin",
    "EU Classification",
    "Tool Group",
    "Set",
    "International OSHA Regulation",
    "National OSHA Regulation",
    "Battery",
    "Sale",
    "Quartal Nr",
    "Powered",
    "Partnerships",
    "Shipping",
  ];
  const outItems = ["EAN", "Price", "Vendor Specific Price"];

  const [content, setContent] = useState<any>([
    <BaseNode
      title="Validate EAN"
      color="yellow"
      inputs={["EAN"]}
      outputs={["Ari EAN"]}
    />,
  ]);
  const [activeDot, setActiveDot] = useState<any>(null);

  const machen = (value: any) => {
    setActiveDot((currentActiveDot: any) => {
      if (currentActiveDot != null) {
        setContent((prev: any) => [
          ...prev,
          <Noodle dotRef1={currentActiveDot} dotRef2={value} />,
        ]);
        return null;
      } else {
        return value;
      }
    });
  };

  useEffect(() => {
    console.log("activeDot:", activeDot);
  }, [activeDot]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "dotClick",
        (e: any) => {
          e.stopImmediatePropagation();

          machen(e.detail);
        },
        false
      );
    }
  }, []);

  return (
    <div className={style.nodeMapEditor}>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <NodeBar type="output" align="left" items={inItems} />
        {content}
        <NodeBar type="input" align="right" items={outItems} />
      </DndProvider>
    </div>
  );
}
export default NodeMapEditor;

// linode
