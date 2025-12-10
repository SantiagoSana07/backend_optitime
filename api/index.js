import express from "express";
import serverless from "serverless-http";
import router, { initDatabase } from "../src/routes/index.js";

const app = express();

await initDatabase(); // Conexión garantizada una sola vez

app.use("/api", router);

export default serverless(app);
