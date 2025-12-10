import { Router } from "express";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "../database/connection.js";

import categoryRoutes from "./category.routes.js";
import dailyJournalRoutes from "./dailyJournal.routes.js";
import taskExceptionRoutes from "./exception.routes.js";
import taskRoutes from "./task.routes.js";
import userRoutes from "./user.routes.js";
import weeklyReportRoutes from "./weeklyReport.routes.js";

const router = Router();

// Configuración CORS
router.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middlewares globales
router.use(morgan("dev"));
router.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();
});
router.use(express.json());

// Ruta de prueba
router.get("/", (req, res) => {
    res.send("API funcionando correctamente");
});

// Rutas principales SIN el prefijo /api
// Ese prefijo se agrega en api/index.js
router.use("/categories", categoryRoutes);
router.use("/daily-journals", dailyJournalRoutes);
router.use("/exceptions", taskExceptionRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/weekly-reports", weeklyReportRoutes);

// Inicializar DB una única vez
let dbInitialized = false;

export const initDatabase = async () => {
    if (!dbInitialized) {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log("Base de datos conectada correctamente");
            dbInitialized = true;
        } catch (err) {
            console.error("Error al conectar la base de datos:", err);
        }
    }
};

export default router;
