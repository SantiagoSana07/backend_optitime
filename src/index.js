import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { createServer as createHttpsServer } from "https";

dotenv.config();

// Importación de rutas
import LoginRoutes from "./routes/login.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import dailyJournalRoutes from "./routes/dailyJournal.routes.js";
import taskExceptionRoutes from "./routes/exception.routes.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import weeklyReportRoutes from "./routes/weeklyReport.routes.js";

const app = express();
const port = process.env.PORT_API || 3001;

console.log("PUERTO API:", port);

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(morgan("dev"));

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando correctamente (sin Sequelize)");
});

// Rutas API
app.use("/api/login", LoginRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/daily-journals", dailyJournalRoutes);
app.use("/api/exceptions", taskExceptionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weekly-reports", weeklyReportRoutes);

// ----- MODO DESARROLLO (HTTP normal) -----
if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`Servidor HTTP corriendo en el puerto ${port}`);
  });
} 
// ----- MODO PRODUCCIÓN (HTTPS) -----
else {
  let httpsOptions;

  const keyPath = "./certs/cert.key";
  const certPath = "./certs/cert.crt";

  try {
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  } catch (error) {
    console.error("Error al cargar certificados SSL:", error.message);
    process.exit(1);
  }

  const httpsServer = createHttpsServer(httpsOptions, app);

  httpsServer.listen(port, () => {
    console.log(`Servidor HTTPS listo en el puerto ${port}`);
  });
}
