import { getConnection } from "../db/connection.js";

// Obtener todas las excepciones
export const getExceptions = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM exceptions ORDER BY id DESC";
    const [rows] = await connection.query(query);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener excepciones" });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener excepción por ID
export const getExceptionById = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM exceptions WHERE id = ?";
    const [rows] = await connection.query(query, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Excepción no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la excepción" });
  } finally {
    if (connection) connection.release();
  }
};

// Crear excepción
export const createException = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { task_id, reason, description } = req.body;

    const query = `
      INSERT INTO exceptions (task_id, reason, description, created_at)
      VALUES (?, ?, ?, NOW())
    `;

    const [result] = await connection.query(query, [
      task_id,
      reason,
      description
    ]);

    res.status(201).json({
      id: result.insertId,
      task_id,
      reason,
      description,
      created_at: new Date()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la excepción" });
  } finally {
    if (connection) connection.release();
  }
};

// Actualizar excepción
export const updateException = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const selectQuery = "SELECT * FROM exceptions WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Excepción no encontrada" });
    }

    const current = rows[0];
    const { task_id, reason, description } = req.body;

    const updateQuery = `
      UPDATE exceptions 
      SET task_id = ?, reason = ?, description = ?
      WHERE id = ?
    `;

    await connection.query(updateQuery, [
      task_id ?? current.task_id,
      reason ?? current.reason,
      description ?? current.description,
      id
    ]);

    res.json({
      id,
      task_id: task_id ?? current.task_id,
      reason: reason ?? current.reason,
      description: description ?? current.description,
      created_at: current.created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la excepción" });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar excepción
export const deleteException = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const selectQuery = "SELECT * FROM exceptions WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Excepción no encontrada" });
    }

    const deleteQuery = "DELETE FROM exceptions WHERE id = ?";
    await connection.query(deleteQuery, [id]);

    res.json({ message: "Excepción eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la excepción" });
  } finally {
    if (connection) connection.release();
  }
};
