import express from "express";

import { userRouter } from "./user";

export let apiRouter = () => {
  const router = express.Router();

  router.use("/users", userRouter());

  return router;
};
