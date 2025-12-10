import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { sequelize } from "./db.js";
import router from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

// Conexion a la BD (solo una vez)
try {
  await sequelize.authenticate();
  console.log("DB OK");
} catch (e) {
  console.error("DB Error:", e);
}

// Exporta el handler para Vercel
export const handler = serverless(app);

// Para desarrollo local
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("API local en http://localhost:3000"));
}
