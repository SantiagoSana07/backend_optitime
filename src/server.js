import express from "express";
import apiRouter, { initDatabase } from "./index.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Usar tus rutas
app.use("/api", apiRouter);

// Inicializar DB y arrancar servidor
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
