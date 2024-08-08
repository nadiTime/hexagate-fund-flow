"use client";

// Isnt api routes supposed to run on the server side?

const API_SERVER = "http://localhost:3000";

import { ChainAddress } from "@/app/types/chainAddress";
import { FundingResData } from "@/app/types/fundingRecord";

export const getFundingGraph = async (
  source: ChainAddress
): Promise<FundingResData> => {
  const res = await fetch(
    `${API_SERVER}/api/v1/funding/graph/${source.chainId}/${source.address}`
  );
  return res.json();
};
