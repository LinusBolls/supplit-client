import type { RefObject } from "react";

interface Field {
  name: string;
  type: string;
  example: string;
}
interface NodeData {
  title: string;
  color: string;
  inputs: Field[];
  outputs: Field[];
}
interface NoodleData {
  startRef: RefObject<HTMLDivElement>;
  endRef: RefObject<HTMLDivElement>;
}
interface NodeMapSchema {
  in: {
    columns: string[];
  };
  out: {
    columns: string[];
  };
  nodes: string[];
  noodles: [number, number][][];
}
// const ExampleSchema = {
//   in: { columns: ["price", "discount"] },
//   out: { columns: ["newPrice"] },
//   nodes: ["multiply"],
//   noodles: [
//     [
//       [0, 0],
//       [2, 0],
//     ],
//     [
//       [1, 0],
//       [2, 1],
//     ],
//     [
//       [2, 2],
//       [3, 0],
//     ],
//   ],
// };
export type { Field, NodeData, NoodleData, NodeMapSchema };
