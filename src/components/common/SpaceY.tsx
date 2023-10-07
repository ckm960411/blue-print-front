import React from "react";

interface SpaceYProps {
  height: React.CSSProperties["height"];
}
export default function SpaceY({ height }: SpaceYProps) {
  return <div className="w-full" style={{ height }} />;
}
