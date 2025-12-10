import { WeeklyReport } from "../models/WeeklyReport.js";

// Obtener todos los reportes semanales
export const getWeeklyReports = async (req, res) => {
  try {
    const reports = await WeeklyReport.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reportes semanales" });
  }
};

// Obtener reporte por ID
export const getWeeklyReportById = async (req, res) => {
  try {
    const report = await WeeklyReport.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el reporte" });
  }
};

// Crear reporte semanal
export const createWeeklyReport = async (req, res) => {
  try {
    const {
      user_id,
      week_start,
      completion_rate,
      top_failure_reason,
      recommendations
    } = req.body;

    const newReport = await WeeklyReport.create({
      user_id,
      week_start,
      completion_rate,
      top_failure_reason,
      recommendations,
      created_at: new Date()
    });

    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el reporte semanal" });
  }
};

// Actualizar reporte semanal
export const updateWeeklyReport = async (req, res) => {
  try {
    const report = await WeeklyReport.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    const {
      user_id,
      week_start,
      completion_rate,
      top_failure_reason,
      recommendations
    } = req.body;

    report.user_id = user_id ?? report.user_id;
    report.week_start = week_start ?? report.week_start;
    report.completion_rate = completion_rate ?? report.completion_rate;
    report.top_failure_reason = top_failure_reason ?? report.top_failure_reason;
    report.recommendations = recommendations ?? report.recommendations;

    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el reporte" });
  }
};

// Eliminar reporte semanal
export const deleteWeeklyReport = async (req, res) => {
  try {
    const report = await WeeklyReport.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    await report.destroy();

    res.json({ message: "Reporte semanal eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el reporte" });
  }
};
