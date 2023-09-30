import { useEffect, useRef, useState } from "react";

/**
 * @param condition ref element 를 보일 조건
 * @description containerHeight 는 ref 를 감싸는 부모요소에 주어야 한다
 */
export const useToggleShowing = (condition: boolean, dependencies?: any[]) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const refHeight = ref.current?.clientHeight;

  useEffect(() => {
    if (condition) {
      refHeight && setContainerHeight(refHeight);
    } else {
      setContainerHeight(0);
    }
  }, [refHeight, condition, ...(dependencies ? dependencies : [])]);

  return { ref, containerHeight, setContainerHeight };
};