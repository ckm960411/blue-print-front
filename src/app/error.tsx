"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>무언가 우롱차가 되고 있어요!</h2>
      <button onClick={reset}>새로 고침하기</button>
    </div>
  );
}
