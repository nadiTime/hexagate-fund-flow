import React from "react";
import { BaseEdge, EdgeProps, getBezierPath } from "reactflow";

export function FundEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <>
      <BaseEdge markerEnd={markerEnd} id={id} path={edgePath} />
    </>
  );
}
