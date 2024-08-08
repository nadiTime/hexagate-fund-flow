import { getFundingGraph } from "@/app/api/funding";
import { ChainAddress } from "@/app/types/chainAddress";
import { FundingResData } from "@/app/types/fundingRecord";
import { getGroupLayout } from "@/app/utils/getGroupLayout";
import { useQuery } from "@tanstack/react-query";
import { Edge, Node } from "reactflow";

type FundsFlowData = {
  readonly isLoading?: boolean;
  isError?: boolean;
  readonly nodes: Node[];
  readonly edges: Edge[];
};

const parseFundingGraph = (
  data: FundingResData
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  data.edges.forEach((edge) => {
    let sourceNode = nodes.find((node) => node.id === edge.source.address);
    if (!sourceNode) {
      sourceNode = {
        position: { x: 0, y: 0 },
        id: edge.source.address,
        data: { label: edge.source.address, ...edge.source },
      };
      nodes.push(sourceNode);
    }

    let targetNode = nodes.find((node) => node.id === edge.dest.address);
    if (!targetNode) {
      targetNode = {
        position: { x: 0, y: 0 },
        id: edge.dest.address,
        data: { label: edge.dest.address, ...edge.dest },
      };
      nodes.push(targetNode);
    }
    edges.push({
      id: `${sourceNode.id}-${targetNode.id}`,
      source: sourceNode.id,
      target: targetNode.id,
    });
  });

  return { nodes, edges };
};

export const useFundsFlow = (sourceAddress: ChainAddress): FundsFlowData => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const data = await getFundingGraph(sourceAddress);
      return parseFundingGraph(data);
    },
  });

  const { nodes, edges } = data || { nodes: [], edges: [] };

  const graph = getGroupLayout(nodes, edges, "LR");

  return {
    isLoading,
    isError,
    nodes: graph.nodes,
    edges,
  };
};
