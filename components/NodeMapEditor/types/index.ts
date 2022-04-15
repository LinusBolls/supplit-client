import type { RefObject } from "react";

type Address = [number, number];
type Facing = "input" | "output";

interface Field {
  name: string;
  type: string;
  example: string;
  facing: Facing;
  ref: RefObject<HTMLButtonElement> | null;
}
type FieldWithAddress = Field & {
  address: Address;
};
interface NodeData {
  title: string;
  color: string;
  fields: { [id: string]: Field };
  left: number;
  top: number;
}
interface NoodleData {
  startId: string;
  endId: string;
}
interface NodeMapSchema {
  in: {
    columns: string[];
  };
  out: {
    columns: string[];
  };
  nodes: string[];
  noodles: Address[][];
}
const exampleSchema: NodeMapSchema = {
  in: { columns: ["price", "discount"] },
  out: { columns: ["newPrice"] },
  nodes: ["multiply"],
  noodles: [
    [
      [0, 0],
      [2, 0],
    ],
    [
      [1, 0],
      [2, 1],
    ],
    [
      [2, 2],
      [3, 0],
    ],
  ],
};
export type {
  Address,
  Facing,
  Field,
  FieldWithAddress,
  NodeData,
  NoodleData,
  NodeMapSchema,
};
