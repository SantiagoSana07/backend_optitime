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

// Configuración CORS para cualquier dominio
app.use(cors({
  origin: "*",           // permite cualquier dominio
  methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"], // permite todos los métodos
  allowedHeaders: ["Content-Type", "Authorization"]          // permite headers comunes
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

// Conectar a la base de datos
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada correctamente");

    app.listen(3000, () => {
      console.log("Servidor ejecutándose en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
