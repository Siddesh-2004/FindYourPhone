import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORSORIGIN,
    credentials: true,
  }),
);
app.use(
  express.json({
    limit: "20kb",
  }),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  }),
);
app.use(express.static("public"));

app.use(cookieParser());


import phoneRoutes from "./routes/phones.route.js"

app.use("/api/v1/phones", phoneRoutes);

export default app;
