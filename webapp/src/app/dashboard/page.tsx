"use client";

import { AddressType, ChainAddress, ChainIds } from "@/app/types/chainAddress";
import { useFundsFlow } from "./hooks/useFundsFlow";
import { Spinner } from "../components/spinner/Spinner";
import FlowChart from "../components/charts/FlowChart";

const sourceChainAddress: ChainAddress = {
  address: "0x39cd23328b5ba304ae70bb0c1866e224f727f962",
  chainId: ChainIds.EthereumMainnet,
  type: AddressType.EOA,
};

export default function Dashboard() {
  const { isLoading, isError, nodes, edges, refetch } =
    useFundsFlow(sourceChainAddress);

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
      {isError && (
        <div>
          <h1>Something went wrong.</h1>
          <button style={{ textDecoration: "underline" }} onClick={refetch}>
            {">>"}Try again
          </button>
        </div>
      )}
      {!isLoading && !isError && nodes.length === 0 && <h1>No data...</h1>}
      {nodes.length > 0 && (
        <div style={{ height: "80%", width: "80%" }}>
          <FlowChart initialNodes={nodes} initialEdges={edges} />
        </div>
      )}
    </div>
  );
}
