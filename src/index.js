import express from "express";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./database/connection.js";

// Rutas
import categoryRoutes from "./routes/category.routes.js";
import dailyJournalRoutes from "./routes/dailyJournal.routes.js";
import taskExceptionRoutes from "./routes/exception.routes.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";
import weeklyReportRoutes from "./routes/weeklyReport.routes.js";

const app = express();

// Configuración CORS
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middlewares globales
app.use(express.json());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Rutas principales
app.use("/api/categories", categoryRoutes);
app.use("/api/daily-journals", dailyJournalRoutes);
app.use("/api/exceptions", taskExceptionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weekly-reports", weeklyReportRoutes);

// Conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log("Base de datos conectada correctamente"))
  .catch(err => console.error("Error al conectar la base de datos:", err));

// ✅ Exportar app para Vercel
export default app;
