import { getConnection } from "../db/connection.js";

// Obtener todas las tareas
export const getTasks = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM tasks ORDER BY id DESC";
    const [rows] = await connection.query(query);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener tareas" });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener tarea por ID
export const getTaskById = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM tasks WHERE id = ?";
    const [rows] = await connection.query(query, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la tarea" });
  } finally {
    if (connection) connection.release();
  }
};

// Crear una tarea
export const createTask = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { title, description, status, due_date, category_id, user_id } =
      req.body;

    const query = `
      INSERT INTO tasks (title, description, status, due_date, category_id, user_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await connection.query(query, [
      title,
      description,
      status || "pending",
      due_date,
      category_id,
      user_id
    ]);

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      status: status || "pending",
      due_date,
      category_id,
      user_id,
      created_at: new Date()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la tarea" });
  } finally {
    if (connection) connection.release();
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const selectQuery = "SELECT * FROM tasks WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const current = rows[0];

    const { title, description, status, due_date, category_id, user_id } =
      req.body;

    const updateQuery = `
      UPDATE tasks
      SET title = ?, description = ?, status = ?, due_date = ?, category_id = ?, user_id = ?
      WHERE id = ?
    `;

    await connection.query(updateQuery, [
      title ?? current.title,
      description ?? current.description,
      status ?? current.status,
      due_date ?? current.due_date,
      category_id ?? current.category_id,
      user_id ?? current.user_id,
      id
    ]);

    res.json({
      id,
      title: title ?? current.title,
      description: description ?? current.description,
      status: status ?? current.status,
      due_date: due_date ?? current.due_date,
      category_id: category_id ?? current.category_id,
      user_id: user_id ?? current.user_id,
      created_at: current.created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;

    const selectQuery = "SELECT * FROM tasks WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const deleteQuery = "DELETE FROM tasks WHERE id = ?";
    await connection.query(deleteQuery, [id]);

    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la tarea" });
  } finally {
    if (connection) connection.release();
  }
};
