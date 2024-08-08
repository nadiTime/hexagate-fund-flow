"use client";

import { AddressType, ChainAddress, ChainIds } from "@/app/types/chainAddress";
import { useFundsFlow } from "./hooks/useFundsFlow";
import ReactFlow, { Background } from "reactflow";
import { useMemo } from "react";
import { FundNode } from "../components/charts";
import { Spinner } from "../components/spinner/Spinner";

const sourceChainAddress: ChainAddress = {
  address: "0x39cd23328b5ba304ae70bb0c1866e224f727f962",
  chainId: ChainIds.EthereumMainnet,
  type: AddressType.EOA,
};

export default function Dashboard() {
  const { isLoading, isError, nodes, edges } = useFundsFlow(sourceChainAddress);
  const nodeTypes = useMemo(() => ({ fundNode: FundNode }), []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F1F5F9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
      }}
    >
      {isLoading && <Spinner />}
      {isError && <h1>Error...</h1>}
      {!isLoading && nodes.length === 0 && <h1>No data...</h1>}
      {nodes.length > 0 && (
        <div style={{ height: "80%", width: "80%" }}>
          <ReactFlow
            fitView
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            draggable
            nodesDraggable
          >
            <Background color="#F1F5F9" />
          </ReactFlow>
        </div>
      )}
    </div>
  );
}
