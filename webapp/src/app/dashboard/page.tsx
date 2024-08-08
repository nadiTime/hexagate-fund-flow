"use client";

import { AddressType, ChainAddress, ChainIds } from "@/app/types/chainAddress";
import { useFundsFlow } from "./hooks/useFundsFlow";
import ReactFlow, { Background } from "reactflow";

const sourceChainAddress: ChainAddress = {
  address: "0x39cd23328b5ba304ae70bb0c1866e224f727f962",
  chainId: ChainIds.EthereumMainnet,
  type: AddressType.EOA,
};

export default function Dashboard() {
  const { isLoading, isError, nodes, edges } = useFundsFlow(sourceChainAddress);

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#F1F5F9" }}>
      <div style={{ height: "100%" }}>
        <ReactFlow nodes={nodes} edges={edges} draggable nodesDraggable>
          <Background color="#F1F5F9" />
        </ReactFlow>
      </div>
    </div>
  );
}
