import express from "express";
import v1Router from "./v1";

const router = express.Router();

router.use("/api", router);

router.use(v1Router);

export default router;
