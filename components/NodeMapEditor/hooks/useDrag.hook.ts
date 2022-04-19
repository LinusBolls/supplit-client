import { useCallback, useEffect, useRef, useState } from "react";

function useDrag() {
  const dragRef = useRef<HTMLElement>(null);
  const moveRef = useRef<HTMLElement>(null);

  function handleMousedown(e: any) {
    e.preventDefault();

    const initialMousePos: [number, number] = [e.clientX, e.clientY];
    const initialElPos: [number, number] = [
      parseInt(moveRef.current?.style.left || "0"),
      parseInt(moveRef.current?.style.top || "0"),
    ];
    const moveListener = handleMousemove(initialMousePos, initialElPos);

    document.addEventListener("mousemove", moveListener);
    document.addEventListener("mouseup", handleMouseup(moveListener));
  }
  useEffect(() => {
    dragRef.current?.addEventListener("mousedown", handleMousedown);

    return () => {
      dragRef.current?.removeEventListener("mousedown", handleMousedown);
    };
  }, []);

  const handleMousemove =
    (initialMousePos: [number, number], initialElPos: [number, number]) =>
    (e: any) => {
      if (moveRef.current == null) return;

      const mouseX = e.clientX - initialMousePos[0];
      const mouseY = e.clientY - initialMousePos[1];

      const elX = initialElPos[0] + mouseX;
      const elY = initialElPos[1] + mouseY;

      if (moveRef.current == null) return;

      moveRef.current.style.left = elX + "px";
      moveRef.current.style.top = elY + "px";
    };

  const handleMouseup = (moveListener: any) => () => {
    document.removeEventListener("mousemove", moveListener);
    document.removeEventListener("mouseup", handleMouseup(moveListener));
  };
  return { dragRef, moveRef };
}
export default useDrag;
