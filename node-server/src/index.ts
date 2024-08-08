import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
var cors = require("cors");
import apiRouter from "./api";

dotenv.config();

const errorHandler = (
  error: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 400;
  res.status(status).json({ message: error.message });
};

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(apiRouter);

app.use(errorHandler);
