import { getConnection } from "../db/connection.js";

// Obtener todos los reportes semanales
export const getWeeklyReports = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM weekly_reports";
    const [reports] = await connection.query(query);

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reportes semanales" });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener reporte por ID
export const getWeeklyReportById = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM weekly_reports WHERE id = ?";
    const [rows] = await connection.query(query, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el reporte" });
  } finally {
    if (connection) connection.release();
  }
};

// Crear reporte semanal
export const createWeeklyReport = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const {
      user_id,
      week_start,
      completion_rate,
      top_failure_reason,
      recommendations
    } = req.body;

    const query = `
      INSERT INTO weekly_reports (
        user_id, week_start, completion_rate, top_failure_reason, recommendations, created_at
      ) VALUES (?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await connection.query(query, [
      user_id,
      week_start,
      completion_rate,
      top_failure_reason,
      recommendations
    ]);

    res.status(201).json({
      id: result.insertId,
      user_id,
      week_start,
      completion_rate,
      top_failure_reason,
      recommendations,
      created_at: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el reporte semanal" });
  } finally {
    if (connection) connection.release();
  }
};

// Actualizar reporte semanal
export const updateWeeklyReport = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const reportId = req.params.id;

    const checkQuery = "SELECT * FROM weekly_reports WHERE id = ?";
    const [rows] = await connection.query(checkQuery, [reportId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    const old = rows[0];

    const {
      user_id,
      week_start,
      completion_rate,
      top_failure_reason,
      recommendations
    } = req.body;

    const query = `
      UPDATE weekly_reports 
      SET user_id = ?, week_start = ?, completion_rate = ?, top_failure_reason = ?, recommendations = ?
      WHERE id = ?
    `;

    await connection.query(query, [
      user_id ?? old.user_id,
      week_start ?? old.week_start,
      completion_rate ?? old.completion_rate,
      top_failure_reason ?? old.top_failure_reason,
      recommendations ?? old.recommendations,
      reportId
    ]);

    res.json({
      id: reportId,
      user_id: user_id ?? old.user_id,
      week_start: week_start ?? old.week_start,
      completion_rate: completion_rate ?? old.completion_rate,
      top_failure_reason: top_failure_reason ?? old.top_failure_reason,
      recommendations: recommendations ?? old.recommendations
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el reporte" });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar reporte semanal
export const deleteWeeklyReport = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "DELETE FROM weekly_reports WHERE id = ?";
    const [result] = await connection.query(query, [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    res.json({ message: "Reporte semanal eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el reporte" });
  } finally {
    if (connection) connection.release();
  }
};
