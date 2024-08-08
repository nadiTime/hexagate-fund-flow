import express from "express";
import graphRouter from "./graph";

const router = express.Router();

router.use("/funding", router);

router.use(graphRouter);

export default router;
