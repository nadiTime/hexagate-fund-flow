import { z } from "zod";

export enum AddressType {
  Contract = "Contract",
  EOA = "EOA",
  Unknown = "Unknown",
}

export enum ChainId {
  EthereumMainnet = 1,
}

export type ChainAddress = {
  address: string;
  chain_id: ChainId;
  type: AddressType;
  name: string | null;
};

export type ChainAddressFromDB = { source: ChainAddress; dest: ChainAddress }[];

export const chainAddressSchema = z.object({
  address: z.string(),
  chain_id: z.nativeEnum(ChainId),
  type: z.nativeEnum(AddressType),
  name: z.string().nullable(),
});

export const chainAddressesFromDBSchema = z.array(
  z
    .object({
      source: chainAddressSchema,
      dest: chainAddressSchema,
    })
    .transform((val) => {
      return { ...val, target: val.dest };
    })
);

export type FundGraphEdge = {
  source: ChainAddress;
  target: ChainAddress;
};

export type FundGraphResponse = {
  edges: FundGraphEdge[];
};
