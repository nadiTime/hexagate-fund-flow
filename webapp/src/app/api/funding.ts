"use client";

import { ChainAddress } from "@/app/types/chainAddress";
import { FundingResData } from "@/app/types/fundingRecord";

export const getFundingGraph = async (
  source: ChainAddress
): Promise<FundingResData> => {
  const res = await fetch(
    `http://localhost:3000/api/v1/funding/graph/${source.chainId}/${source.address}`
  );
  return res.json();
};
