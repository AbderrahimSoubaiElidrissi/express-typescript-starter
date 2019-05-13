import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import morgan from "morgan";
import { MONGODB_URI } from "./util/secrets";
import { apiRouter } from "./routes/main.route";

const cors = require("cors");

const app = express();

app.use(cors());

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose
  .connect(mongoUrl, { useMongoClient: true })
  .then(() => console.log("Connected to Mongodb server"))
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

app.use(morgan("dev"));

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * API routes.
 */

app.use("/api/" + process.env.API_VERSION, apiRouter());

export default app;
