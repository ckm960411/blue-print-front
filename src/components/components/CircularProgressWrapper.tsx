"use client";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useEffect, useState } from "react";

interface CircularProgressWrapperProps {
  value: number;
  strokeWidth?: number;
  pathColor?: string;
  trailColor?: string;
  w?: number;
  h?: number;
  className?: HTMLDivElement["className"];
}
export default function CircularProgressWrapper({
  value,
  strokeWidth = 12,
  pathColor = "#001487",
  trailColor = "#e2e8f0", // gray-200
  w = 32,
  h,
  className,
}: CircularProgressWrapperProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(value), 300);
  }, [value]);

  return (
    <div className={className} style={{ width: w, height: h ?? w }}>
      <CircularProgressbar
        value={progress}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          pathColor,
          trailColor,
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
}
