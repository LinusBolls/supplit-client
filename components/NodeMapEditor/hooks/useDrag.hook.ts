import { useCallback, useEffect, useRef, useState } from "react";

function useDrag() {
  const dragRef = useRef<HTMLElement>(null);
  const moveRef = useRef<HTMLElement>(null);

  const [startPos, setStartPos] = useState<[number, number]>([0, 0]);
  const [elStartPos, setElStartPos] = useState<[number, number]>([0, 0]);
  const [endPos, setEndPos] = useState<[number, number]>([0, 0]);

  function handleMousedown(e: any) {
    e.preventDefault();

    setStartPos([e.clientX, e.clientY]);
    setElStartPos([
      parseInt(moveRef.current?.style.left || "0"),
      parseInt(moveRef.current?.style.top || "0"),
    ]);

    document.addEventListener("mouseup", handleMouseup);
    document.addEventListener("mousemove", handleMousemove);
  }
  useEffect(() => {
    dragRef.current?.addEventListener("mousedown", handleMousedown);

    return () => {
      dragRef.current?.removeEventListener("mousedown", handleMousedown);
    };
  }, []);

  const handleMousemove = useCallback(
    (e: any) => {
      if (moveRef.current == null) return;

      setStartPos((prev) => {
        setElStartPos((prevEl) => {
          const mouseX = e.clientX - prev[0];
          const mouseY = e.clientY - prev[1];

          const elX = prevEl[0] + mouseX;
          const elY = prevEl[1] + mouseY;

          if (moveRef.current == null) return prevEl;

          moveRef.current.style.left = elX + "px";
          moveRef.current.style.top = elY + "px";

          return prevEl;
        });
        return prev;
      });
    },
    [startPos]
  );

  // function handleMousemove(e: any) {
  //   if (moveRef.current == null) return;

  //   console.log(startPos);

  //   const mouseX = e.clientX - startPos[0];
  //   const mouseY = e.clientY - startPos[1];

  //   const elX = elStartPos[0] + mouseX;
  //   const elY = elStartPos[1] + mouseY;

  //   moveRef.current.style.left = elX + "px";
  //   moveRef.current.style.top = elY + "px";
  // }

  function handleMouseup() {
    document.removeEventListener("mouseup", handleMouseup);
    document.removeEventListener("mousemove", handleMousemove);
  }
  return { dragRef, moveRef, startPos, endPos };
}
export default useDrag;
