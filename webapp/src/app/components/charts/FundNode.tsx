import { Handle, NodeProps, Position } from "reactflow";
import { FC } from "react";
import { ChainAddress } from "@/app/types/chainAddress";

interface AddressNodeData extends ChainAddress {
  readonly isSource?: boolean;
}

export const FundNode: FC<NodeProps<AddressNodeData>> = (node) => {
  const { data } = node;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ visibility: "hidden" }}
      />
      <div
        style={{
          background: data.isSource ? "#F0F9FE" : "#fff",
          padding: "10px",
          height: "70px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5px",
          width: "200px",
          borderRadius: "5px",
          border: "1px solid #D7F0FD",
          color: "#000",
          fontSize: "14px",
        }}
      >
        {data.name && <div style={{ fontWeight: "bold" }}>{data.name}</div>}
        <div
          style={{
            whiteSpace: "nowrap",
            width: "160px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.address}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ visibility: "hidden" }}
      />
    </>
  );
};
