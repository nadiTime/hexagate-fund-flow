import express from "express";
import fundingRouter from "./funding";

const router = express.Router();

router.use("/v1", router);

router.use(fundingRouter);

export default router;
