import express from "express";

import * as UsersController from "../controllers/user";

export let userRouter = () => {
  const router = express.Router();

  router.get("/", UsersController.getAll);

  router.get("/:id", UsersController.get);

  router.post("/", UsersController.create);

  router.put("/:id", UsersController.update);

  router.delete("/:id", UsersController.remove);

  return router;
};
