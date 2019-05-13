import { default as User } from "../models/user";
import { Request, Response } from "express";

export let getAll = (req: Request, res: Response) => {
  User.find({}).exec((err, users) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      return res.json(users);
    }
  });
};

export let get = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  User.findById(id).exec((err, users) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.json(users);
  });
};

export let create = (req: Request, res: Response) => {
  const data = req.body;

  console.log(data);

  if (!data) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  const user = new User(data);

  user.save((err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.status(201).json(user);
  });
};

export let update = (req: Request, res: Response) => {
  const id = req.params.id;

  const patch = req.body;

  if (!id || !patch) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  User.findByIdAndUpdate(id, { $set: patch }, { new: true }).exec(
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.json(user);
    }
  );
};

export let remove = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  User.findByIdAndRemove(id).exec((err, doc) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.status(204).json({});
  });
};
