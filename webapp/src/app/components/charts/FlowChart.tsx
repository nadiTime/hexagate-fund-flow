import React, { FC, memo, useCallback, useState } from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  FitViewOptions,
  Node,
  NodeChange,
  ReactFlow,
} from "reactflow";
import {
  customEdges,
  nodeTypes,
} from "@/app/components/charts/FlowChart.constants";

const fitViewOptions: FitViewOptions = {
  padding: 0.3,
};

type FlowChartProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
  className?: string;
  preventScrolling?: boolean;
  children?: JSX.Element | JSX.Element[];
};

const FlowChart: FC<FlowChartProps> = ({
  initialEdges,
  initialNodes,
  className,
  children,
}) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      fitViewOptions={fitViewOptions}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={customEdges}
      className={className}
      defaultEdgeOptions={{ zIndex: 0 }}
    >
      {children}
    </ReactFlow>
  );
};

export default memo(FlowChart);
