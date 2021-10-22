import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import compression from "compression";

dotenv.config();

const PORT = process.env.PORT || 8000;

process.on("unhandledRejection", err => {
  throw err;
});

export const app = express();

app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(cors());

import { isAuthenticated } from "./config/auth";
import { authRoutes } from "./routes/auth";
import { scoresRoutes } from "./routes/scores";
import { handleError } from "./utils/handleError";

app.get("/status", (req, res) => {
  res.status(200).send("Success");
});

app.use("/auth", authRoutes);

app.use(isAuthenticated);
app.use("/scores", scoresRoutes);

app.use(isAuthenticated, express.static(path.join(__dirname, "../../client/build")));
app.get("*", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
