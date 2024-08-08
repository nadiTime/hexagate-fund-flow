import express, { NextFunction, Request, Response } from "express";
import {
  chainAddressesFromDBSchema,
  ChainId,
  FundGraphResponse,
} from "../../schema";
import { z } from "zod";
import data from "../../../../data.json";
import { tryParseObject } from "../../utils/tryParseObject";

const router = express.Router();

router.use("/graph", router);

router.get(
  "/:chain/:address",
  async (
    req: Request,
    res: Response<FundGraphResponse>,
    next: NextFunction
  ) => {
    const schema = z.object({
      chain: z.nativeEnum({ ETHEREUM_MAINNET: 1 }),
      address: z.string(),
    });
    try {
      tryParseObject(schema, {
        address: req.params.address,
        chain: parseInt(req.params.chain),
      });

      // TODO: fetch data from db
      const parsedData = tryParseObject(chainAddressesFromDBSchema, data);

      // TODO: get relevant edges only?

      res.send({ edges: parsedData });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
