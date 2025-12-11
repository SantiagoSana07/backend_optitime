import { getConnection } from "../db/connection.js";

// Obtener todos los diarios
export const getDailyJournals = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM daily_journals ORDER BY date DESC";
    const [rows] = await connection.query(query);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los diarios" });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener diario por ID
export const getDailyJournalById = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM daily_journals WHERE id = ?";
    const [rows] = await connection.query(query, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Diario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el diario" });
  } finally {
    if (connection) connection.release();
  }
};

// Crear un nuevo diario
export const createDailyJournal = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { user_id, date, entry, rating } = req.body;

    const query = `
      INSERT INTO daily_journals (user_id, date, entry, rating, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;

    const [result] = await connection.query(query, [
      user_id,
      date,
      entry,
      rating ?? null
    ]);

    res.status(201).json({
      id: result.insertId,
      user_id,
      date,
      entry,
      rating: rating ?? null,
      created_at: new Date()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el diario" });
  } finally {
    if (connection) connection.release();
  }
};

// Actualizar un diario
export const updateDailyJournal = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const selectQuery = "SELECT * FROM daily_journals WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Diario no encontrado" });
    }

    const current = rows[0];
    const { user_id, date, entry, rating } = req.body;

    const updateQuery = `
      UPDATE daily_journals
      SET user_id = ?, date = ?, entry = ?, rating = ?
      WHERE id = ?
    `;

    await connection.query(updateQuery, [
      user_id ?? current.user_id,
      date ?? current.date,
      entry ?? current.entry,
      rating ?? current.rating,
      id
    ]);

    res.json({
      id,
      user_id: user_id ?? current.user_id,
      date: date ?? current.date,
      entry: entry ?? current.entry,
      rating: rating ?? current.rating,
      created_at: current.created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el diario" });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar un diario
export const deleteDailyJournal = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const selectQuery = "SELECT * FROM daily_journals WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Diario no encontrado" });
    }

    const deleteQuery = "DELETE FROM daily_journals WHERE id = ?";
    await connection.query(deleteQuery, [id]);

    res.json({ message: "Diario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el diario" });
  } finally {
    if (connection) connection.release();
  }
};
