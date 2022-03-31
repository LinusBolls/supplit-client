import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import style from "./css/index.module.css";
import ToolBar from "./ToolBar";
import Column from "./Column";
import { Row, ExpandingRow } from "./Row";
// import BaseNode from "./BaseNode";
// import NodeBar from "./NodeBar";
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
    // <BaseNode
    //   title="Validate EAN"
    //   color="yellow"
    //   inputs={["EAN"]}
    //   outputs={["Ari EAN"]}
    // />,
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
    <div className={style.editor}>
      <DndProvider backend={HTML5Backend}>
        <ToolBar />

        <Column>
          {inItems.map((i: string) => (
            <ExpandingRow
              HeadEl={
                <Row
                  align="spaceBetween"
                  type="out"
                  Slot0={<span>{i}</span>}
                  Slot1={"amoge"}
                  Slot2={"alkwjer"}
                />
              }
            >
              ...
            </ExpandingRow>
          ))}
        </Column>

        {content}

        {/* <Column>
            {outItems.map((i: string) => (
              <ExpandingRow
                HeadEl={
                  <Row align="spaceBetween" type="in" inDot>
                    {i}
                  </Row>
                }
              >
                die andere
              </ExpandingRow>
            ))}
          </Column> */}
      </DndProvider>
    </div>
  );
}
export default NodeMapEditor;

// linode cloud computing
